// src/components/UploadForm.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function UploadForm({instituteName,certExists}) {
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
      const rollNumber = file.name.replace(".pdf", "");
      const signature = signatures[file.name];
      if (!signature) {
        newStatus[i] = "Signature missing ❌";
        setStatus([...newStatus]);
        continue;
      }
      formData.append("signature", signature);
      formData.append("file", file);
      formData.append("instituteName", instituteName);
      formData.append("rollNumber", rollNumber);

      try {
        // Replace with actual backend endpoint
        console.log(token);
        await axios.post("http://localhost:5000/api/institute/upload", formData, {
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
  };

  return (
    <div>
      <h3>Upload Signed Certificates</h3>
      <input type="file" multiple onChange={handleFileChange} disabled={!certExists} />

      <h3>Signatures JSON:</h3>
      <input type="file" accept=".json" disabled={!certExists} onChange={handleSignaturesChange} />

      <button onClick={handleUpload} disabled={files.length === 0 || !certExists || !signaturesFile}>
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
