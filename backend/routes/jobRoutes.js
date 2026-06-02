import express from 'express';
import { activeJobs, createJob, deleteJob, getJob, listJobs, updateJob } from '../controllers/jobController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/active', activeJobs);
router.route('/').get(protect, authorize('admin', 'super-admin'), listJobs).post(protect, authorize('admin', 'super-admin'), createJob);
router.route('/:id').get(protect, authorize('admin', 'super-admin'), getJob).patch(protect, authorize('admin', 'super-admin'), updateJob).delete(protect, authorize('admin', 'super-admin'), deleteJob);

export default router;
