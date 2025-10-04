import mongoose from "mongoose";

const InstituteCertSchema = new mongoose.Schema({
  institutionCode: {
    type: String,
    required: true,
    unique: true,
  },
  publicKey: {
    type: String, // PEM content of the public key certificate
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("InstituteCert", InstituteCertSchema);
