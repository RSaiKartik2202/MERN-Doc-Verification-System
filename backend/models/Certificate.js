import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true },
  instituteName: { type: String, required: true },
  signature: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Certificate", certificateSchema);
