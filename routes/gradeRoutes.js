import express from 'express';
import { showAddGrade, createGrade, showGradeList } from '../controllers/gradeController.js';
import { checkAuth } from '../middleware/auth.js';

const router = express.Router();

// Show add grade form
router.get('/add-grade', checkAuth, showAddGrade);

// Handle create grade
router.post('/add-grade', checkAuth, createGrade);

// Show grade list
router.get('/grade-list', checkAuth, showGradeList);

export default router;