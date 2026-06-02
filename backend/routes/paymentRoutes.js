import express from 'express';
import { listPayments, recordPayment } from '../controllers/paymentController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, authorize('admin', 'super-admin'), listPayments).post(protect, recordPayment);

export default router;
