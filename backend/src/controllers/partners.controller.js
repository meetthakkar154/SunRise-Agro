const { appendToSheet } = require('../services/googleSheets');
const { sendNotification } = require('../services/mailer');

async function submitPartnerLead(req, res, next) {
  try {
    const { name, phone, email, message } = req.body;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Save to Google Sheet
    await appendToSheet('Partner Requests', [timestamp, name, phone, email, message]);

    // Send email notification
    await sendNotification({ type: 'partner', name, phone, email, message });

    res.status(201).json({ message: 'Partner request submitted successfully.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitPartnerLead };
