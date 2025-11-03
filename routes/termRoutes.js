import express from 'express';
import { showAddTerm, createTerm, showTermList, showEditTerm, updateTerm, deleteTerm } from '../controllers/termController.js';
import { checkAuth } from '../middleware/auth.js';

const router = express.Router();

// Show form to add a new term
router.get('/add-term', checkAuth, showAddTerm);

// Create a new term (form submission)
router.post('/add-term', checkAuth, createTerm);

// List all terms
router.get('/term-list', checkAuth, showTermList);

router.get('/edit-term/:id', checkAuth, showEditTerm);

router.post('/edit-term/:id', checkAuth, updateTerm);   

router.post('/delete-term/:id', checkAuth, deleteTerm);

export default router;
