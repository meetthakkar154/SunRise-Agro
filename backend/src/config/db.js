const mongoose = require('mongoose');

async function connectDb() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.log('MONGO_URI not set. Running without database persistence.');
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed. Continuing without persistence.');
  }
}

module.exports = { connectDb };
