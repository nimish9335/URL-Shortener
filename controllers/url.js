const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    if (!req.user) return res.redirect("/login");

    const body = req.body;

    if (!body.url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const shortID = shortid.generate();

    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    });

    const allurls = await URL.find({ createdBy: req.user._id });

    return res.render("home", {
      id: shortID,
      urls: allurls,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;

    const result = await URL.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};