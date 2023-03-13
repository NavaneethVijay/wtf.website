import { supabase } from "../../lib/supabaseClient";
import { isUri } from 'valid-url'

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

const RequestHeader = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
}

export default async function handler(req, res) {

  if (req.method === "POST") {

    let { url = null } = req.body;

    if (!url) {
      res.status(400).json({ message: "Missing url parameters" });
    }
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      url = "https://" + url;
    }
    if (!isUri(url)) {
      res.status(400).json({ message: "Invalid url" });
    }


    const prompt = `I want you to act like a website summarizer. I will input website url and your job is to convert it into a useful summary of a few sentences. Do not repeat sentences and make sure all sentences are clear and complete: "${url}"`

    const payload = {
      model: process.env.OPENAI_API_MODEL,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 200,
      n: 1,
      messages: [
        {
          role: "user",
          content: prompt
        },
      ],
    }

    const summary = await processRequest(payload)

    try {
      await supabase.from(process.env.SUPABASE_STATS_TABLE).insert({
        url: url,
        content: summary
      });
    } catch (error) {

    }

    res.status(200).json({
      data: summary,
      url,
    });
  } else {
    res.status(401).json({ message: "Method Not allowed" });
  }
}

/**
 * 
 * @param {*} payload 
 * @returns 
 */
async function processRequest(payload) {

  const response = await fetch(process.env.OPENAI_API_URL, {
    headers: RequestHeader,
    method: "POST",
    body: JSON.stringify(payload),
  }).then(res => res.json())

  return response.choices[0].message.content;
}
