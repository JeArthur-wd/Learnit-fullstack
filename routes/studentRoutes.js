import express from 'express';
import { CreateStudent, showAddStudent, showStudentList } from '../controllers/studentController.js';
const router = express.Router();

router.get('/add-student', showAddStudent);
router.get('/student-list', showStudentList);
router.post('/create-student', CreateStudent);

export default router;
