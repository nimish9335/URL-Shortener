const express = require('express');
const router = express.Router();
const {getURL,shortURL}=require("../collectors/url_controller");

router.get('/:shortId', getURL);
router.post('/', shortURL);

module.exports = router;