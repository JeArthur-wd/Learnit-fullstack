// routes/userRoutes.js
import express from 'express';
import { showAddUser, CreateUser, showUserList } from '../controllers/userController.js';

const router = express.Router();

// Apply validation to create user route
router.get('/add-user', showAddUser);
router.post('/add-user', CreateUser);
router.get('/user-list', showUserList);

export default router;