import express from 'express';
import { 
    showAddSubject, 
    createSubject, 
    showSubjectList 
} from '../controllers/subjectController.js';
import { checkAuth } from '../middleware/auth.js';

const router = express.Router();


router.get('/add-subject', checkAuth, showAddSubject);
router.post('/add-subject', checkAuth, createSubject);
router.get('/subject-list', checkAuth, showSubjectList);

export default router;
 