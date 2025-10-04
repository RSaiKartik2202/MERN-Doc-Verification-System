// scripts/signFiles.js
import fs from "fs";
import path from "path";
import crypto from "crypto";

// === CONFIGURATION ===
const instituteName = "NITW"; // <--- change institute name here

const privateKeyPath = `../data/keys/${instituteName}_private.pem`;
const certsFolder = `../data/certificates/${instituteName}`;
const outputFile = `../data/signatures/${instituteName}_signatures.json`;

// Ensure output folder exists
fs.mkdirSync(path.dirname(outputFile), { recursive: true });

// === LOAD PRIVATE KEY ===
if (!fs.existsSync(privateKeyPath)) {
  console.error(`❌ Private key not found for ${instituteName}: ${privateKeyPath}`);
  process.exit(1);
}
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
    file,       // original filename (e.g., rollnumber.pdf)
    signature,  // base64 signature
  };
});

// Save signatures
fs.writeFileSync(outputFile, JSON.stringify(signatures, null, 2));
console.log(`✅ Signatures saved to ${outputFile}`);
