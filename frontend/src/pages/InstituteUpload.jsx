// src/pages/InstituteUpload.jsx
import UploadForm from "../components/UploadForm";
import InstituteCertificateManager from "../components/InstituteCertificateManager";
import { useState } from "react";
import Logout from "../components/Logout";
import "./InstituteUpload.css";

export default function InstituteUpload() {
  const [certExists, setCertExists] = useState(false);
  return (
    <div className="institute-upload-page">
      <div className="institute-dashboard-container">
        <h2 className="institute-dashboard-title">Institute Upload Dashboard</h2>
        <div className="upload-box">
          <InstituteCertificateManager onCertUploaded={() => setCertExists(true)} />
        </div>
        <div className="upload-box">
          <UploadForm certExists={certExists} />
        </div>
        <div className="logout-container">
          <Logout/>
        </div>
      </div>
    </div>
  );
}
