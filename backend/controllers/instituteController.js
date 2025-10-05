import asyncHandler from 'express-async-handler';
import crypto from "crypto";
import Certificate from '../models/Certificate.js';
import InstituteCert from '../models/InstituteCert.js';

const uploadDocument = asyncHandler(async (req, res) => {
  const {signature, rollNumber } = req.body;
  const institutionCode = req.user.institutionCode;
  const file = req.file;

  if (!institutionCode || !file || !rollNumber || !signature) {
    return res.status(400).json({ message: 'Institute code, signature, roll number and file are required' });
  }
  console.log(`Received upload request from ${institutionCode} for roll number ${rollNumber}`);

  const existingCert = await InstituteCert.findOne({ institutionCode });
  if(!existingCert) {
    return res.status(400).json({ message: `'${institutionCode}' hasn't registered it's PKC.` });
  }

  const publicKey = existingCert.publicKey;

  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(file.buffer);
  verifier.end();

  const isValid = verifier.verify(publicKey, signature, 'base64');
  if (!isValid) {
    console.log(signature);
    return res.status(400).json({ message: 'Invalid signature. Upload rejected.' });
  }

  console.log('Valid signature. Proceeding to save certificate record.');

  await Certificate.create({
    rollNumber,
    institutionCode,
    signature,
  });

  res.status(200).json({
    success: true,
    message: `Certificate of roll no.'${rollNumber}' uploaded successfully by '${institutionCode}'`,
    data: {
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      status: 'uploaded',
    },
  });
});

export { uploadDocument };
