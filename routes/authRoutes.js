import express from 'express';
import { login, showRegisterPage, signup, logout, showLoginPage } from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../middleware/validators.js';
import { checkAuth } from '../middleware/auth.js';
// Import user-related controllers if needed
// import { getUser } from '../controllers/userController.js';

const router = express.Router();

// Base route
router.get('/', (req, res) => res.redirect('/login'));

// Auth routes
router.get('/login', showLoginPage);
router.get('/register', showRegisterPage);
router.post('/signup', validateSignup, signup);
router.post('/signin', validateLogin, login);
router.get('/logout', logout);

// Example user route (uncomment if you have getUser)
// router.get('/:user_ID', checkAuth, getUser);

export default router;