import asyncHandler from 'express-async-handler';
import fs from "fs";
import path from "path";
import crypto from "crypto";
import Certificate from '../models/Certificate.js';
import InstituteCert from '../models/InstituteCert.js';

// Dummy institute upload route with file handling
const uploadDocument = asyncHandler(async (req, res) => {
  const { instituteName, signature, rollNumber } = req.body;
  const file = req.file;

  if (!instituteName || !file || !rollNumber || !signature) {
    return res.status(400).json({ message: 'Institute name, signature, roll number and file are required' });
  }
  console.log(`Received upload request from ${instituteName} for roll number ${rollNumber}`);

  const uploadsFolder=path.join(process.cwd(), 'data' , 'uploaded_files', instituteName);

  fs.mkdirSync(uploadsFolder, { recursive: true });
  const filePath = path.join(uploadsFolder, file.originalname);
  fs.writeFileSync(filePath, file.buffer);

  // const fileHash = crypto.createHash('sha256').update(file.buffer).digest('hex');

  const existingCert = await InstituteCert.findOne({ institute: instituteName });
  if(!existingCert) {
    return res.status(400).json({ message: `Institute '${instituteName}' hasn't registered it's PKC.` });
  }

  const publicKey = existingCert.publicKey;

  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(file.buffer);
  verifier.end();

  const isValid = verifier.verify(publicKey, signature, 'base64');
  if (!isValid) {
    return res.status(400).json({ message: 'Invalid signature. Upload rejected.' });
  }

  await Certificate.create({
    rollNumber,
    instituteName,
    signature,
  });

  res.status(200).json({
    success: true,
    message: `Certificate of roll no.'${rollNumber}' uploaded successfully by '${instituteName}'`,
    data: {
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      status: 'uploaded',
    },
  });
});

export { uploadDocument };
