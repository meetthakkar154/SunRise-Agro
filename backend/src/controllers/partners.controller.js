const mongoose = require('mongoose');
const PartnerLead = require('../models/PartnerLead');

async function submitPartnerLead(req, res, next) {
  try {
    const payload = req.body;
    if (mongoose.connection.readyState === 1) {
      await PartnerLead.create(payload);
    }
    res.status(201).json({ message: 'Partner request submitted successfully.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitPartnerLead };
