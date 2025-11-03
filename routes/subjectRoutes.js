import express from 'express';
import { 
    showAddSubject, 
    createSubject, 
    showSubjectList,
    showEditSubject,
    updateSubject,
    deleteSubject
} from '../controllers/subjectController.js';
import { checkAuth } from '../middleware/auth.js';

const router = express.Router();


router.get('/add-subject', checkAuth, showAddSubject);
// router.post('/add-subject', checkAuth, createSubject);
router.post('/add-subject', checkAuth, (req, res, next) => {
    console.log('Form data received:', req.body);
    next();
}, createSubject);
router.get('/subject-list', checkAuth, showSubjectList);
router.get('/edit-subject/:id', checkAuth, showEditSubject);
router.post('/edit-subject/:id', checkAuth, updateSubject);
router.post('/delete-subject/:id', checkAuth, deleteSubject);

export default router;
 