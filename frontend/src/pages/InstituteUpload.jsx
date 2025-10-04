// src/pages/InstituteUpload.jsx
import UploadForm from "../components/UploadForm";
import InstituteCertificateManager from "../components/InstituteCertificateManager";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function InstituteUpload() {
  const { user } = useContext(AuthContext);
  const instituteName = user?.name; // Default for testing
  const [certExists, setCertExists] = useState(false);
  return (
    <div>
      <h2>Institute Upload Dashboard</h2>
      <InstituteCertificateManager
        instituteName={instituteName}
        onCertUploaded={() => setCertExists(true)}
      />
      <UploadForm 
        instituteName={instituteName}
        certExists={certExists}
      />
    </div>
  );
}
