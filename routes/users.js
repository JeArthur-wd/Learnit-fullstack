// routes/userRoutes.js
import express from 'express';
import { showAddUser, CreateUser, showUserList, showEditUser, UpdateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Apply validation to create user route
router.get('/add-user', showAddUser);
router.post('/add-user', CreateUser);
router.get('/user-list', showUserList);
// Edit user
router.get('/edit-user/:id', showEditUser);
router.post('/edit-user/:id', UpdateUser);
// Delete user
router.post('/delete-user/:id', deleteUser);


export default router;