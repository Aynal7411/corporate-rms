import express from 'express';
import { applyForJob, listApplications, updateApplicationStatus } from '../controllers/applicationController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, listApplications).post(protect, authorize('candidate'), applyForJob);
router.patch('/:id/status', protect, authorize('admin', 'super-admin'), updateApplicationStatus);

export default router;
