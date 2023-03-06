const { Configuration, OpenAIApi } = require("openai");
const validUrl = require("valid-url");

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
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
      max_tokens: 2000,
    });
    // completion.data.choices[0].text
    res.status(200).json({
      data: completion.data.choices[0].text,
      url,
    });
  } else {
    res.status(401).json({ message: "Method Not allowed" });
  }
}
