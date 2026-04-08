
require('dotenv').config();

// Import the connectDB function
const connectDB = require('./config/db');

// Import the Express library
const express = require('express');

// Call the function to connect to the database
connectDB();

// Initialize an instance of the Express application
const app = express();

// Middleware to parse JSON payloads
app.use(express.json());


// 1. Mount the API routes first.
// Any request starting with /api will be handled by urlRoutes.
const urlRoutes = require('./routes/urls');
app.use('/api', urlRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);



// 2. Mount the index/redirect routes second.
// Any other GET request will be potentially handled by this router.
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Define the port the server will run on.
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server is alive and running on port ${PORT}`));