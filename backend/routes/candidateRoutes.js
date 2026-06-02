import express from 'express';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { getCandidate, listCandidateApplications, listCandidatePayments } from '../controllers/candidateController.js';

const router = express.Router();

router.get('/:id', protect, authorize('admin', 'super-admin'), getCandidate);
router.get('/:id/applications', protect, authorize('admin', 'super-admin'), listCandidateApplications);
router.get('/:id/payments', protect, authorize('admin', 'super-admin'), listCandidatePayments);

export default router;
