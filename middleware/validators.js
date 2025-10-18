import { body, validationResult } from 'express-validator';

export const validateSignup = [
  body('FName').notEmpty().withMessage('First name is required'),
  body('LName').notEmpty().withMessage('Last name is required'),
  body('Email').isEmail().withMessage('Valid email is required'),
  body('Password').isLength({ min: 2 }).withMessage('Password must be at least 2 characters'),
  body('confirmPassword').isLength({ min: 2 }).withMessage('Must be same as Password'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', 'Email and password are required');
      return res.redirect('/login');
    }
    next();
  },
];