const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/signup");
  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/signup", (req, res) => {
  if (req.user) return res.redirect("login");
  return res.render("signup");
});

router.get("/login", (req, res) => {
  if(!req.user) return res.render("/");
  return res.render("login");
});

module.exports = router;
