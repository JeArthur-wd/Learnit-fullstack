import express from 'express';
import { showLoginPage, showRegisterPage } from '../controllers/authController.js';


const router = express.Router();

// Define the base route for the application
router.get('/', showLoginPage);
router.get('/login', showLoginPage);
router.get('/logout', (req, res) => {
    // Handle logout logic here
    // clear session or token, etc.
    res.redirect('/');
});
router.get('/register', showRegisterPage);

export default router;
// 