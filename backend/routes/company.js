import express from 'express';
import multer from 'multer';
import { verifyDocument } from '../controllers/companyController.js';
import auth from '../middleware/auth.js';
import authorizeRoles from '../middleware/roleAuth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/verify', auth, authorizeRoles('Company'), upload.single('file'), verifyDocument);

export default router;
