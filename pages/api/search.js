const { Configuration, OpenAIApi } = require("openai");
const validUrl = require("valid-url");
import { supabase } from "../../lib/supabaseClient";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.2,
});
const openai = new OpenAIApi(configuration);
export default async function handler(req, res) {
  if (req.method === "POST") {
    let { url = null } = req.body;

    if (!url) {
      res.status(400).json({ message: "Missing url parameters" });
    }
    if (!url.match(/^[a-zA-Z]+:\/\//)) {
      url = "https://" + url;
    }
    if (!validUrl.isUri(url)) {
      res.status(400).json({ message: "Invalid url" });
    }
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `summarize ${url}`,
      max_tokens: 800,
    });
    // completion.data.choices[0].text
    // await supabase.from(process.env.SUPABASE_STATS_TABLE).insert({
    //   url: url,
    //   content: completion.data.choices[0].text,
    // });
    res.status(200).json({
      data: completion.data.choices,
      url,
    });
  } else {
    res.status(401).json({ message: "Method Not allowed" });
  }
}
