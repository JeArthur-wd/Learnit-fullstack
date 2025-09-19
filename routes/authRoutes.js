// import express from 'express';
// // import { showLoginPage, showRegisterPage } from '../controllers/authController.js';
// import { login, showRegisterPage, signup } from '../controllers/userController.js';


// const router = express.Router();

// // Define the base route for the application
// router.get('/', login);
// router.get('/login', login);
// router.get('/logout', (req, res) => {
//     // Handle logout logic here
//     // clear session or token, etc.
//     res.redirect('/');
// });
// router.get('/register', showRegisterPage);
// router.post('/signup', signup);
// router.post('/signin', login);

// export default router;

import express from 'express';
import { login, showRegisterPage, signup, logout } from '../controllers/userController.js';

const router = express.Router();

// Define the base route for the application
router.get('/', (req, res) => res.redirect('/login'));
router.get('/login', (req, res) => res.render('auth/login'));
router.get('/logout', logout);
router.get('/register', showRegisterPage);
router.post('/signup', signup);
router.post('/signin', login);

export default router;