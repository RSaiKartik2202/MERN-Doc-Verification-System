// src/pages/InstituteUpload.jsx
import UploadForm from "../components/UploadForm";
import InstituteCertificateManager from "../components/InstituteCertificateManager";
import { useState, useContext } from "react";
import Logout from "../components/Logout";

export default function InstituteUpload() {
  const [certExists, setCertExists] = useState(false);
  return (
    <div>
      <h2>Institute Upload Dashboard</h2>
      <InstituteCertificateManager
        onCertUploaded={() => setCertExists(true)}
      />
      <UploadForm 
        certExists={certExists}
      />
      <Logout/>
    </div>
  );
}
