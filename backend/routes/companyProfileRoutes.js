import express from 'express';
import { getCompanyProfile, updateCompanyProfile } from '../controllers/companyProfileController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getCompanyProfile);
router.patch('/', protect, authorize('admin', 'super-admin'), upload.single('logo'), updateCompanyProfile);

export default router;
