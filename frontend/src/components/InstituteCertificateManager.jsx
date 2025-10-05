import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function InstituteCertificateManager({ onCertUploaded }) {
  const { token } = useContext(AuthContext);
  const [certificate, setCertificate] = useState(null);
  const [pkcFile, setPkcFile] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Check if certificate exists
    const fetchCertificate = async () => {
      try {
        const res = await axios.get(`{import.meta.env.VITE_BACKEND_URL}/api/institute/certificate`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.exists) {
          setCertificate(res.data.publicKey);
          setStatus("Public Key Certificate(PKC) is already uploaded.");
          onCertUploaded();
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCertificate();
  }, [token]);

  const handleUploadCert = async () => {
    if (!pkcFile) return;
    const formData = new FormData();
    formData.append("certificateFile", pkcFile);

    try {
      const res = await axios.post(`{import.meta.env.VITE_BACKEND_URL}/api/institute/certificate`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCertificate(res.data.publicKey);
      setStatus(res.data.message);
      onCertUploaded();
    } catch (err) {
      setStatus(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div>
      <h3>Institute Public Key Certificate</h3>
      {certificate ? (
        <p>PKC uploaded ✅</p>
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
