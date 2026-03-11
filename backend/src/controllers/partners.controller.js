const { appendToSheet } = require('../services/googleSheets');
const { sendNotification } = require('../services/mailer');

async function submitPartnerLead(req, res, next) {
  try {
    const { name, countryCode, phone, email, city, pincode, products, message } = req.body;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const fullPhone = `${countryCode} ${phone}`;

    // Save to Google Sheet
    const headers = ['Timestamp', 'Name', 'Country Code', 'Phone', 'Full Phone', 'Email', 'City', 'Pincode', 'Products', 'Message'];
    await appendToSheet('Customer Requests', [timestamp, name, countryCode, phone, fullPhone, email, city || '', pincode || '', products || '', message || ''], headers);

    // Send email notification
    await sendNotification({
      type: 'partner',
      name,
      countryCode,
      phone: fullPhone,
      email,
      city: city || '-',
      pincode: pincode || '-',
      message: {
        city,
        pincode,
        products,
        message
      }
    });

    res.status(201).json({ message: 'Partner request submitted successfully.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitPartnerLead };
