const mongoose = require('mongoose');
const Contact = require('../models/Contact');

async function submitContact(req, res, next) {
  try {
    const payload = req.body;
    if (mongoose.connection.readyState === 1) {
      await Contact.create(payload);
    }
    res.status(201).json({ message: 'Message received successfully.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitContact };
