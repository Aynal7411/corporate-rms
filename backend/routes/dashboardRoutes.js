import express from 'express';
import { analytics } from '../controllers/dashboardController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/analytics', protect, authorize('admin', 'super-admin'), analytics);

export default router;
