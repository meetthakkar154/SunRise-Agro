const { appendToSheet } = require('../services/googleSheets');
const { sendNotification } = require('../services/mailer');

async function submitPartnerLead(req, res, next) {
  try {
    const { name, phone, email, city, pincode, products, message } = req.body;
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // Save to Google Sheet
    const headers = ['Timestamp', 'Name', 'Phone', 'Email', 'City', 'Pincode', 'Products', 'Message'];
    await appendToSheet('Partner Requests', [timestamp, name, phone, email, city || '', pincode || '', products || '', message], headers);

    // Send email notification
    const fullMessage = `City: ${city || '-'}, Pincode: ${pincode || '-'}\nProducts: ${products || '-'}\n\n${message}`;
    await sendNotification({ type: 'partner', name, phone, email, message: fullMessage });

    res.status(201).json({ message: 'Partner request submitted successfully.' });
  } catch (error) {
    next(error);
  }
}

module.exports = { submitPartnerLead };
