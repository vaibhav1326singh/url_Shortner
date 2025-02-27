const shortId = require("shortid");
const Url = require("../model/url.model.js");

const handleShortUrl = async (req, res) => {
  const { url: redirectUrl } = req.body;

  if (!redirectUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  const generatedshortId = shortId();

  await Url.create({
    shortId: generatedshortId,
    redirectUrl: redirectUrl,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", { id: generatedshortId });
};

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  }

module.exports = {
  handleShortUrl,
  handleGetAnalytics
};
