import express from 'express';
import { showDashboard } from '../controllers/dashboardController.js';
import { checkAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', checkAuth, showDashboard);

export default router;
