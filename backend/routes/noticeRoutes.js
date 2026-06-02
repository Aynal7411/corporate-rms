import express from 'express';
import { createNotice, deleteNotice, getNotice, listNotices, updateNotice } from '../controllers/noticeController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(listNotices).post(protect, authorize('admin', 'super-admin'), createNotice);
router.route('/:id').get(getNotice).patch(protect, authorize('admin', 'super-admin'), updateNotice).delete(protect, authorize('admin', 'super-admin'), deleteNotice);

export default router;
