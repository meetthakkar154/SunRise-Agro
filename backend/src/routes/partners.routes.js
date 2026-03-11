const express = require('express');
const { body } = require('express-validator');
const { submitPartnerLead } = require('../controllers/partners.controller');
const { validateRequest } = require('../middleware/validateRequest');
const { getPhoneLength } = require('../utils/phoneLengths');

const router = express.Router();

const sharedValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('countryCode').trim().notEmpty().withMessage('Country code is required'),
  body('phone')
    .trim()
    .custom((value, { req }) => {
      const expectedLength = getPhoneLength(req.body.countryCode);
      if (!new RegExp(`^[0-9]{${expectedLength}}$`).test(value)) {
        throw new Error(`Phone must be ${expectedLength} digits`);
      }
      return true;
    }),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('pincode').trim().matches(/^[0-9]{6}$/).withMessage('Pincode must be 6 digits'),
  body('products').trim().notEmpty().withMessage('At least one product is required'),
];

router.post('/', sharedValidators, validateRequest, submitPartnerLead);

module.exports = router;
