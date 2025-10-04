import asyncHandler from "express-async-handler";
import InstituteCert from "../models/InstituteCert.js";

// GET /api/institute/certificate
const getInstituteCert = asyncHandler(async (req, res) => {
  const institutionCode= req.user.institutionCode;
  if (!institutionCode) {
    return res.status(400).json({ message: "Institution code missing in token" });
  }

  const cert = await InstituteCert.findOne({ institutionCode });
  if (!cert) {
    return res.json({ exists: false });
  }

  res.json({ exists: true, publicKey: cert.publicKey });
});

// POST /api/institute/certificate
const uploadInstituteCert = asyncHandler(async (req, res) => {
  const institutionCode = req.user.institutionCode;
  if (!institutionCode) {
    return res.status(400).json({ message: "Institution code missing in token" });
  }
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "Public Key Certificate(PKC) is required" });
  }

  // Convert buffer to string
  const publicKeyPem = file.buffer.toString("utf-8");

  const cert = new InstituteCert({ institutionCode: institutionCode, publicKey: publicKeyPem });
  await cert.save();

  res.status(201).json({ message: "Public Key Certificate(PKC) uploaded successfully",publicKey: cert.publicKey });
});

export { getInstituteCert, uploadInstituteCert };
