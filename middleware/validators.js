import { body, validationResult } from 'express-validator';

export const validateSignup = [
  body('FName').notEmpty().withMessage('First name is required'),
  body('LName').notEmpty().withMessage('Last name is required'),
  body('Email').isEmail().withMessage('Valid email is required'),
  body('Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  body('Email').isEmail().withMessage('Valid email is required'),
  body('Password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];