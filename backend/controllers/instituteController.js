import asyncHandler from 'express-async-handler';

// Dummy institute upload route with file handling
const uploadDocument = asyncHandler(async (req, res) => {
  const { instituteName } = req.body;
  const file = req.file;

  if (!instituteName || !file) {
    return res.status(400).json({ message: 'Institute name and file are required' });
  }

  console.log(`Received upload request from ${instituteName} for file ${file.originalname}`);

  res.status(200).json({
    success: true,
    message: `File '${file.originalname}' uploaded successfully by '${instituteName}'`,
    data: {
      documentId: 'dummy-doc-id-1234',
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      status: 'uploaded',
    },
  });
});

export { uploadDocument };
