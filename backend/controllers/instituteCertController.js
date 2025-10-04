import asyncHandler from "express-async-handler";
import InstituteCert from "../models/InstituteCert.js";

// GET /api/institute/certificate?institute=NITW
const getInstituteCert = asyncHandler(async (req, res) => {
  const { institute } = req.query;
  if (!institute) {
    return res.status(400).json({ message: "Institute name is required" });
  }

  const cert = await InstituteCert.findOne({ institute });
  if (!cert) {
    return res.json({ exists: false });
  }

  res.json({ exists: true, publicKey: cert.publicKey });
});

// POST /api/institute/certificate
const uploadInstituteCert = asyncHandler(async (req, res) => {
  const { instituteName } = req.body;
  const file = req.file;

  if (!instituteName || !file) {
    console.log(instituteName, file);
    return res.status(400).json({ message: "Institute name and certificate file are required" });
  }

  // Convert buffer to string
  const publicKeyPem = file.buffer.toString("utf-8");

  // Prevent duplicate certs
  const existing = await InstituteCert.findOne({ institute:instituteName });
  if (existing) {
    return res.status(400).json({ message: "Certificate already exists for this institute" });
  }

  const cert = new InstituteCert({ institute:instituteName, publicKey: publicKeyPem });
  await cert.save();

  res.status(201).json({ message: "Certificate uploaded successfully" });
});

export { getInstituteCert, uploadInstituteCert };
