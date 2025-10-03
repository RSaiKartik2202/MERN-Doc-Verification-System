// src/components/UploadForm.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function UploadForm() {
  const { token } = useContext(AuthContext);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
    setStatus(Array(e.target.files.length).fill("Pending"));
  };

  const handleUpload = async () => {
    const newStatus = [...status];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      // Add optional fields if needed
      formData.append("instituteName", "NITW");
      // formData.append("studentName", "John Doe");

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
      <h3>Upload Certificates</h3>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={files.length === 0}>
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
