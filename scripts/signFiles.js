// scripts/signFiles.js
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { generateKeyPair } from "./generateKeys.js";

// === CLI ARGUMENTS ===
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Usage: node signFiles.js <INSTITUTION_CODE>");
  process.exit(1);
}
const institutionCode = args[0];

// === FILE PATHS ===
const privateKeyPath = `../data/keys/${institutionCode}_private.pem`;
const publicKeyPath = `../data/keys/${institutionCode}_public.pem`;
const certsFolder = `../data/certificates/${institutionCode}`;
const outputFile = `../data/signatures/${institutionCode}_signatures.json`;

// Ensure output folder exists
fs.mkdirSync(path.dirname(outputFile), { recursive: true });

// === GENERATE KEYS IF MISSING ===
if (!fs.existsSync(privateKeyPath) || !fs.existsSync(publicKeyPath)) {
  console.log(`🔑 Keys not found for ${institutionCode}, generating new key pair...`);
  generateKeyPair(institutionCode);
}

// === LOAD PRIVATE KEY ===
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

// === SIGNING FUNCTION ===
function signFile(filePath) {
  const data = fs.readFileSync(filePath);
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(data);
  signer.end();
  return signer.sign(privateKey, "base64"); // signature in base64
}

// === SIGN ALL FILES ===
if (!fs.existsSync(certsFolder)) {
  console.error(`❌ Certificates folder not found: ${certsFolder}`);
  process.exit(1);
}

const files = fs.readdirSync(certsFolder).filter((f) => f.endsWith(".pdf"));

const signatures = files.map((file) => {
  const filePath = path.join(certsFolder, file);
  const signature = signFile(filePath);
  console.log(`✅ Signed: ${file}`);
  return {
    file,       // original filename
    signature,  // base64 signature
  };
});

// Save signatures
fs.writeFileSync(outputFile, JSON.stringify(signatures, null, 2));
console.log(`✅ Signatures saved to ${outputFile}`);
