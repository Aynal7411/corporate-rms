import express from 'express';
import {
  createContactMessage,
  deleteContactMessage,
  getContactMessage,
  listContactMessages,
  updateContactMessage
} from '../controllers/contactController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createContactMessage);
router.get('/', protect, authorize('admin', 'super-admin'), listContactMessages);
router.get('/:id', protect, authorize('admin', 'super-admin'), getContactMessage);
router.patch('/:id', protect, authorize('admin', 'super-admin'), updateContactMessage);
router.delete('/:id', protect, authorize('admin', 'super-admin'), deleteContactMessage);

export default router;
