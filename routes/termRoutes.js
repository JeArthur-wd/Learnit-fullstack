import express from 'express';
import { showAddTerm, createTerm, showTermList } from '../controllers/termController.js';
import { checkAuth } from '../middleware/auth.js';

const router = express.Router();

// Show form to add a new term
router.get('/add-term', checkAuth, showAddTerm);

// Create a new term (form submission)
router.post('/add-term', checkAuth, createTerm);

// List all terms
router.get('/term-list', checkAuth, showTermList);

export default router;
