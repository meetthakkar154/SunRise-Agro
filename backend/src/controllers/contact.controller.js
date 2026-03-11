const { appendToSheet } = require('../services/googleSheets');
const { sendNotification } = require('../services/mailer');

async function submitContact(req, res, next) {
  try {
    const { name, countryCode, phone, email, city, pincode, message } = req.body;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const fullPhone = `${countryCode} ${phone}`;

    // Save to Google Sheet
    const headers = ['Timestamp', 'Name', 'Country Code', 'Phone', 'Full Phone', 'Email', 'City', 'Pincode', 'Message'];
    await appendToSheet('Contact Inquiries', [timestamp, name, countryCode, phone, fullPhone, email, city || '', pincode || '', message || ''], headers);

    // Send email notification
    await sendNotification({
      type: 'contact',
      name,
      countryCode,
      phone: fullPhone,
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
