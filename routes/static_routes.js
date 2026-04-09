const express = require('express');
const router = express.Router();
const URL=require('../models/URL_Schema');

router.get('/', async (req, res) => {
    const urls = await URL.find({});
    res.render('home', { url:urls });
});
module.exports = router;