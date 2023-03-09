import axios from "axios";
import { supabase } from "../../lib/supabaseClient";
const validUrl = require("valid-url");

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
    if (!validUrl.isUri(url)) {
      res.status(400).json({ message: "Invalid url" });
    }

    const { data: {
      choices
    } } = await axios({
      method: "POST",
      url: process.env.OPENAI_API_URL,
      data: {
        model: process.env.OPENAI_API_MODEL ,
        messages: [
          {
            role: "user",
            content: `summarize ${url}`,
          },
        ],
      },
      headers: RequestHeader,
    });

    await supabase.from(process.env.SUPABASE_STATS_TABLE).insert({
      url: url,
      content: choices[0].message.content
    });
    res.status(200).json({
      data: choices[0].message.content,
      url,
    });
  } else {
    res.status(401).json({ message: "Method Not allowed" });
  }
}
