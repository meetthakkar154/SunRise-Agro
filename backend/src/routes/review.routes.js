const express = require('express');
const router = express.Router();
const { sendReviewMail } = require('../services/mailer');

// POST /api/review
router.post('/', async (req, res) => {
  try {
    const { name, review, rating } = req.body;
    if (!name || !review) {
      return res.status(400).json({ error: 'Name and review are required.' });
    }
    await sendReviewMail({ name, review, rating });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send review email.' });
  }
});

module.exports = router;
