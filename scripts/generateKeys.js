// scripts/generateKeys.js
import crypto from "crypto";
import fs from "fs";

export function generateKeyPair(instituteName) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  // Save keys locally
  fs.writeFileSync(`../data/keys/${instituteName}_private.pem`, privateKey);
  fs.writeFileSync(`../data/keys/${instituteName}_public.pem`, publicKey);

  console.log("Key pair generated:");
  console.log(`${instituteName}_private.pem`);
  console.log(`${instituteName}_public.pem`);
}
