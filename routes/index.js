import express from 'express';
import studentRoutes from './studentRoutes.js';
import authRoutes from './authRoutes.js';
import subjectRoutes from './subjectRoutes.js';

const router = express.Router();

// Use auth routes
router.use('/', authRoutes);

// Define the base route for student-related operations
router.use('/', studentRoutes);
router.use('/', subjectRoutes);
// Dashboard route
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: req.user });
});

// Home route
router.get('/', (req, res) => {
    res.redirect('/login'); // Redirect to login instead of welcome message
});

export default router;