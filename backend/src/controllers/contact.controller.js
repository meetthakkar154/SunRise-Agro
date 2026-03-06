const { appendToSheet } = require('../services/googleSheets');
const { sendNotification } = require('../services/mailer');

async function submitContact(req, res, next) {
  try {
    const { name, phone, email, message } = req.body;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Save to Google Sheet
    await appendToSheet('Contact Inquiries', [timestamp, name, phone, email, message]);

    // Send email notification
    await sendNotification({ type: 'contact', name, phone, email, message });

    res.status(201).json({ message: 'Message received successfully.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitContact };
