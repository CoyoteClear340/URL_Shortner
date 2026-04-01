// controllers/urlController.js

// Import the 'valid-url' library
const validUrl = require('valid-url');
// Import the Url model
const Url = require('../models/Url');


const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ success: false, error: 'Please provide a URL' });
  }

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ success: false, error: 'Invalid URL format provided' });
  }

  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      // If the URL already exists, we send it back with a 200 OK status.
      return res.status(200).json({ success: true, data: url });
    }

    // Since the URL is new, we generate a unique short code
    const { nanoid } = await import('nanoid');
    const urlCode = nanoid(7);

    // Construct the full short URL
    const shortUrl = `${process.env.BASE_URL}/${urlCode}`;

    // Create and save the new URL document in the database.
    // This was the focus of our previous task.
    url = await Url.create({
      longUrl,
      shortUrl,
      urlCode,
    });

    // --- THIS IS OUR  TASK ---
    // Send the response back to the client.
    // A 201 'Created' status code is the most appropriate for a successful
    // POST request that results in the creation of a new resource.
    res.status(201).json({ success: true, data: url });

  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = {
  shortenUrl,
};