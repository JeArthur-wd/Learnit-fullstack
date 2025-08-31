import express from 'express';
import studentRoutes from './studentRoutes.js';
import authRoutes from './authRoutes.js';
import users from './users.js';


const router = express.Router();

// Define the base route for the application
router.use('/', authRoutes);
// router.use('/grades', gradeRoutes);
// router.use('/users', userRoutes);
// router.use('/students', studentRoutes);
// router.use('/subjects', subjectRoutes);
// router.use('/terms', termRoutes);

// Define the base route for student-related operations
router.use('/', studentRoutes);

// Dashboard route
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: req.user }); // Pass the decoded user data
});

// Logout route
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/dashboard');
});

router.get('/', (req, res) => {
    res.send('Welcome to the Learnit Fullstack Application');
});
export default router;
