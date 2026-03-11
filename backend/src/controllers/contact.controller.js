const { appendToSheet } = require('../services/googleSheets');
const { sendNotification } = require('../services/mailer');

async function submitContact(req, res, next) {
  try {
    const { name, phone, email, city, pincode, message } = req.body;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Save to Google Sheet
    const headers = ['Timestamp', 'Name', 'Phone', 'Email', 'City', 'Pincode', 'Message'];
    await appendToSheet('Contact Inquiries', [timestamp, name, phone, email, city || '', pincode || '', message], headers);

    // Send email notification
    await sendNotification({
      type: 'contact',
      name,
      phone,
      email,
      city: city || '-',
      pincode: pincode || '-',
      message: message || '-',
    });

    res.status(201).json({ message: 'Message received successfully.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitContact };
