const express = require('express');
const { body } = require('express-validator');
const { submitContact } = require('../controllers/contact.controller');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

const sharedValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('message').trim().isLength({ min: 5 }).withMessage('Message must be at least 5 characters'),
];

router.post('/', sharedValidators, validateRequest, submitContact);

module.exports = router;
