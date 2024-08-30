const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Create the Express app
const app = express();

// Middleware
app.use(cors()); // To allow cross-origin requests
app.use(express.json()); // To parse JSON bodies

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/taskdb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Start the server
const port = process.env.PORT || 4000; // Default to port 4000 if not specified
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
