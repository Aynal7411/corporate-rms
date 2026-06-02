import express from 'express';
import { createNews, deleteNews, getNews, listNews, updateNews } from '../controllers/newsController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(listNews).post(protect, authorize('admin', 'super-admin'), createNews);
router.route('/:id').get(getNews).patch(protect, authorize('admin', 'super-admin'), updateNews).delete(protect, authorize('admin', 'super-admin'), deleteNews);

export default router;
