const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

// Use MongoDB URL from the environment variable
const mongodburl = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongodburl)
  .then(() => console.log('Connected to MongoDB server'))
  .catch((err) => console.error('MongoDB server connection error:', err));

// Monitor connection events
const db = mongoose.connection;

db.on('connected', () => {
  console.log('MongoDB server connected');
});

db.on('error', (err) => {
  console.error('MongoDB server connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB server disconnected');
});

module.exports = db;
