import express from 'express';
import { showAddGrade, createGrade, showGradeList, showEditGrade, updateGrade, deleteGrade  } from '../controllers/gradeController.js';
import { checkAuth } from '../middleware/auth.js';

const router = express.Router();

// Show add grade form
router.get('/add-grade', checkAuth, showAddGrade);

// Handle create grade
router.post('/add-grade', checkAuth, createGrade);

// Show grade list
router.get('/grade-list', checkAuth, showGradeList);

// Show edit grade form
router.get('/edit-grade/:id', checkAuth, showEditGrade);

// Handle update grade
router.post('/edit-grade/:id', checkAuth, updateGrade);

// delete grade
router.post('/delete-grade/:id', checkAuth, deleteGrade);

export default router;