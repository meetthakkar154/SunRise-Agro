const nodemailer = require('nodemailer');

let transporter = null;

function initMailer() {
  const user = (process.env.SMTP_EMAIL || '').trim();
  const pass = (process.env.SMTP_PASSWORD || '').trim();

  if (!user || !pass) {
    console.log('SMTP credentials not set. Email notifications disabled.');
    return;
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });

  console.log('Email notification service initialised.');
}

async function sendNotification({ type, name, phone, email, message }) {
  if (!transporter) throw new Error('Mailer not initialised');

  const notifyEmail = (process.env.NOTIFY_EMAIL || process.env.SMTP_EMAIL || '').trim();

  const subject = type === 'partner'
    ? `🤝 New Partner Request from ${name}`
    : `📩 New Contact Inquiry from ${name}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #ddd;border-radius:8px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#1b5e20,#4caf50);padding:20px;color:#fff">
        <h2 style="margin:0">☀ Sunrise Agro Process</h2>
        <p style="margin:5px 0 0;opacity:.9">${type === 'partner' ? 'New Partner Request' : 'New Contact Inquiry'}</p>
      </div>
      <div style="padding:20px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;font-weight:bold;color:#555;width:100px">Name</td><td style="padding:8px 0">${name}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;color:#555">Phone</td><td style="padding:8px 0"><a href="tel:${phone}">${phone}</a></td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;color:#555">Email</td><td style="padding:8px 0;word-break:break-word;max-width:220px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td colspan="2" style="height:12px"></td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;color:#555">City</td><td style="padding:8px 0;word-break:break-word;max-width:220px">${message.city || '-'}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;color:#555">Pincode</td><td style="padding:8px 0;word-break:break-word;max-width:220px">${message.pincode || '-'}</td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;color:#555">Products</td><td style="padding:8px 0;word-break:break-word;white-space:pre-line;max-width:220px">${Array.isArray(message.products) ? message.products.join(', ') : message.products || '-'}</td></tr>
          <tr><td colspan="2" style="height:12px"></td></tr>
          <tr><td style="padding:8px 0;font-weight:bold;color:#555;vertical-align:top">Message</td><td style="padding:8px 0;word-break:break-word;white-space:pre-line;max-width:220px">${message.message ? message.message.replace(/\n/g, '<br>') : '-'}</td></tr>
          <tr><td colspan="2" style="height:12px"></td></tr>
        </table>
      </div>
      <div style="background:#f5f5f5;padding:12px 20px;font-size:12px;color:#999;text-align:center">
        Sent from SAP Website • ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"SAP Website" <${(process.env.SMTP_EMAIL || '').trim()}>`,
    to: notifyEmail,
    subject,
    html,
  });
}

module.exports = { initMailer, sendNotification };
