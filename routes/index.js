// routes/index.js

const express = require('express');
const { redirectToUrl } = require('../controllers/urlController');

// Create a new router object.
const router = express.Router();


/**
 * @route   GET /:code
 * @desc    Redirect to the long/original URL
 * @access  Public
 */
router.get('/:code', redirectToUrl);

// Export the router so it can be mounted in our main server.js file.
module.exports = router;