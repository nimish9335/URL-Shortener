const URL = require("../models/URL_Schema");
const shortid = require("shortid");

const getURL = async (req, res) => {
    const shortURL = await URL.findOne({ shortId: req.params.shortId });

    if (!shortURL) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    shortURL.visitHistory.push({ timestamp: new Date() });
    await shortURL.save();

    return res.redirect(shortURL.redirectURL);
};

// FIXED FUNCTION
const shortURLHandler = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortId = shortid.generate();

    const newEntry = await URL.create({
        shortId,
        redirectURL: url,
        visitHistory: []
    });
    await newEntry.save(); 
    return res.render('home',{
        id:shortId
    });
};

module.exports = {
    getURL,
    shortURL: shortURLHandler   // keeping export name same
};