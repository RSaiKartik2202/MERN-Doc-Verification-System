import asyncHandler from 'express-async-handler';

// Dummy company verification route with file handling
const verifyDocument = asyncHandler(async (req, res) => {
  const { institute, rollNumber } = req.body;
  const file = req.file;

  if (!institute || !rollNumber || !file) {
    return res.status(400).json({ message: 'Institute, roll number, and file are required' });
  }

  console.log(`Verification request for roll number ${rollNumber} from institute ${institute}`);

  res.status(200).json({
    success: true,
    message: `File '${file.originalname}' verified successfully for '${rollNumber}' at '${institute}'`,
    data: {
      documentId: 'dummy-doc-id-1234',
      fileName: file.originalname,
      verified: true,
      verifiedAt: new Date().toISOString(),
    },
  });
});

export { verifyDocument };
