const express = require('express');

const {shortenUrl} = require('../controllers/urlController')
const router = express.Router();

/**
 * @route POST/api/shorten
 * @desc  Create a new short URL
 * @acess Public
 */
router.post('/shorten',shortenUrl); // -> pasing shortenURl fxn itself we are not calling the fxn here passing by reference

module.exports =router;