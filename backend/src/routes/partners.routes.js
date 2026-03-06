const express = require('express');
const { body } = require('express-validator');
const { submitPartnerLead } = require('../controllers/partners.controller');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

const sharedValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('phone').trim().matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('pincode').trim().matches(/^[0-9]{6}$/).withMessage('Pincode must be 6 digits'),
  body('products').trim().notEmpty().withMessage('At least one product is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

router.post('/', sharedValidators, validateRequest, submitPartnerLead);

module.exports = router;
