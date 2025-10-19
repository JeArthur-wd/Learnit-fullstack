import express from 'express';
import { CreateStudent,
     showAddStudent,
      showStudentList,
    showEditStudent,
    updateStudent 
} from '../controllers/studentController.js';

const router = express.Router();

router.get('/add-student', showAddStudent);
router.get('/student-list', showStudentList);
router.post('/create-student', CreateStudent);

// Edit student
router.get('/edit-student/:id', showEditStudent);
router.post('/edit-student/:id', updateStudent);

export default router;
