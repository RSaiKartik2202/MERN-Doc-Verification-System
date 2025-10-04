import express from 'express';
import multer from 'multer';
import { uploadDocument } from '../controllers/instituteController.js';
import auth from '../middleware/auth.js';
import authorizeRoles from '../middleware/roleAuth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // files kept in memory

router.post('/upload',auth,authorizeRoles('Institution'), upload.single('file'), uploadDocument);

export default router;
