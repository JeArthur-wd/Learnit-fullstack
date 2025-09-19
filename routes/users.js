// // var express = require('express');
// // var router = express.Router();

// // /* GET users listing. */
// // router.get('/', function (req, res, next) {
// //   res.send('respond with a resource');
// // });

// // module.exports = router;

import express from 'express';
import { signup } from '../controllers/userController.js';
import { validateSignup, validateLogin } from '../middleware/validators.js';
import { checkAuth } from '../middleware/auth.js';
import { showLoginPage, showRegisterPage } from '../controllers/userController.js';



const router = express.Router();

router.post('/signup', validateSignup, signup); // Confirm this line is present
// router.post('/login', validateLogin, login);
// router.get('/:user_ID', checkAuth, getUser);
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.clearCookie('token');
        req.flash('success', 'Logged out successfully');
        res.redirect('/login');
    });
});


export default router;