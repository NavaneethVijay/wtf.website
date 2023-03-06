export default async function handler(req, res) {
    const { url } = req.query
    const response  = await fetch(`https://link-previews.stephanbogner.de/api?url=${url}`)
    const { image, title, description, name  } = await response.json();
    res.status(200).json({image, title, description, name })
}