import express from 'express';
import { createOfficer, deleteOfficer, getOfficer, listOfficers, updateOfficer } from '../controllers/officerController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/').get(listOfficers).post(protect, authorize('admin', 'super-admin'), upload.single('photo'), createOfficer);
router
  .route('/:id')
  .get(getOfficer)
  .patch(protect, authorize('admin', 'super-admin'), upload.single('photo'), updateOfficer)
  .delete(protect, authorize('admin', 'super-admin'), deleteOfficer);

export default router;
