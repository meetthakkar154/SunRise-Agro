const express = require('express');
const router = express.Router();
const { sendReviewMail } = require('../services/mailer');

// POST /api/review
router.post('/', async (req, res) => {
  try {
    const { name, review, rating } = req.body;
    console.log('[REVIEW ROUTE] Received:', { name, review, rating });
    if (!name || !review) {
      console.log('[REVIEW ROUTE] Missing name or review');
      return res.status(400).json({ error: 'Name and review are required.' });
    }
    await sendReviewMail({ name, review, rating });
    console.log('[REVIEW ROUTE] Review mail sent successfully');
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('[REVIEW ROUTE] Error sending review mail:', err);
    res.status(500).json({ error: 'Failed to send review email.' });
  }
});

module.exports = router;
