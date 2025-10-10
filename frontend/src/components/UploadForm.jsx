// src/components/UploadForm.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./UploadForm.css";

export default function UploadForm({certExists}) {
  const { token } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState([]);
  const [signaturesFile, setSignaturesFile] = useState(null);
  const [signatures, setSignatures] = useState({});

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setStatus(Array(e.target.files.length).fill("Pending"));
  };

  const handleSignaturesChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSignaturesFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        // Convert array to object for easy lookup
        const sigMap = {};
        json.forEach((item) => {
          sigMap[item.file] = item.signature;
        });
        setSignatures(sigMap);
      } catch (err) {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleUpload = async () => {
    const newStatus = [...status];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      const file = files[i];
      // Assuming roll number is part of the file name before the extension
      // In future, we can either extract it from the pdf or add metadata during signing
      const rollNumber = file.name.replace(".pdf", "");
      const signature = signatures[file.name];
      if (!signature) {
        newStatus[i] = "Signature missing ❌";
        setStatus([...newStatus]);
        continue;
      }
      formData.append("signature", signature);
      formData.append("file", file);
      formData.append("rollNumber", rollNumber);

      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/institute/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        newStatus[i] = "Uploaded ✅";
      } catch (err) {
        newStatus[i] = "Failed ❌";
      }
      setStatus([...newStatus]);
    }
    setFiles([]);
    setSignaturesFile(null);
    setSignatures({});
  };

  return (
    <div className="upload-form-container">
      <h3>Upload Signed Certificates</h3>
      <input type="file" multiple onChange={handleFileChange} disabled={!certExists} className="upload-file"/>

      <h3>Upload Signatures(JSON)</h3>
      <input type="file" accept=".json" disabled={!certExists} onChange={handleSignaturesChange} className="upload-file"/>

      <button onClick={handleUpload} disabled={files.length === 0 || !certExists || !signaturesFile} className="upload-btn">
        Upload
      </button>

      {files.length > 0 && (
        <ul>
          {files.map((file, idx) => (
            <li key={idx}>
              {file.name} - {status[idx]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
