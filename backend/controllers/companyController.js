import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import Certificate from '../models/Certificate.js';
import InstituteCert from '../models/InstituteCert.js';

// Dummy company verification route with file handling
const verifyDocument = asyncHandler(async (req, res) => {
  const { institute, rollNumber } = req.body;
  const file = req.file;

  if (!institute || !rollNumber || !file) {
    return res.status(400).json({ message: 'Institute, roll number, and file are required' });
  }

  console.log(`Verification request for roll number ${rollNumber} from institute ${institute}`);

  const certRecord =await Certificate.findOne({
    instituteName: institute,
    rollNumber: rollNumber,
  });
  if (!certRecord) {
    return res.status(404).json({ message: 'No certificate record found for the provided details' });
  }

  const instituteCert =await InstituteCert.findOne({institute: institute});
  if(!instituteCert) {
    return res.status(404).json({ message: 'No PKC found for the provided institute' });
  }

  const publicKey = instituteCert.publicKey;

  const fileBuffer = file.buffer;
  
  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(fileBuffer);
  verifier.end();

  const isValid = verifier.verify(publicKey, certRecord.signature, 'base64');
  if (!isValid) {
    return res.status(400).json({ message: 'Document verification failed: Invalid signature.' });
  }

  

  res.status(200).json({
    success: true,
    message: `Certificate of '${rollNumber}' at '${institute}' verified successfully`,
    data: {
      fileName: file.originalname,
      verified: true,
      verifiedAt: new Date().toISOString(),
    },
  });
});

export { verifyDocument };
