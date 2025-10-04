import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function InstituteCertificateManager({ instituteName, onCertUploaded }) {
  const { token } = useContext(AuthContext);
  const [certificate, setCertificate] = useState(null);
  const [pkcFile, setPkcFile] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Check if certificate exists
    const fetchCertificate = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/institute/certificate?institute=${instituteName}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // if (res.data.exists) setCertificate(res.data.publicKey);
        if (res.data.exists) setCertificate("Uploaded");
        onCertUploaded();
      } catch (err) {
        console.error(err);
      }
    };
    fetchCertificate();
  }, [instituteName, token]);

  const handleUploadCert = async () => {
    if (!pkcFile) return;
    const formData = new FormData();
    formData.append("certificateFile", pkcFile);
    formData.append("instituteName", instituteName);

    try {
      const res = await axios.post("http://localhost:5000/api/institute/certificate", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus(res.data.message);
      onCertUploaded();
      setCertificate("Uploaded"); // simple flag
    } catch (err) {
      setStatus(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div>
      <h3>Institute Public Key Certificate</h3>
      {certificate ? (
        <p>Certificate uploaded ✅</p>
      ) : (
        <>
          <input type="file" onChange={(e) => setPkcFile(e.target.files[0])} />
          <button onClick={handleUploadCert} disabled={!pkcFile}>Upload Certificate</button>
        </>
      )}
      {status && <p>{status}</p>}
    </div>
  );
}
