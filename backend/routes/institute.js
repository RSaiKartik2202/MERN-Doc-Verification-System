import express from 'express';
import multer from 'multer';
import { uploadDocument } from '../controllers/instituteController.js';
import auth from '../middleware/auth.js';
import authorizeRoles from '../middleware/roleAuth.js';
import { getInstituteCert, uploadInstituteCert } from "../controllers/instituteCertController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // files kept in memory

router.post('/upload',auth,authorizeRoles('Institution'), upload.single('file'), uploadDocument);

router.post("/certificate",auth,authorizeRoles('Institution'), upload.single("certificateFile"), uploadInstituteCert);

router.get("/certificate",auth,authorizeRoles('Institution'), getInstituteCert);

export default router;
