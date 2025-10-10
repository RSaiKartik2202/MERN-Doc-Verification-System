// src/components/VerifyForm.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./VerifyForm.css";

export default function VerifyForm() {
  const { token } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [institutionCode, setInstitutionCode] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [result, setResult] = useState("");

  const handleVerify = async () => {
    if (!file || !institutionCode || !rollNumber) {
      alert("Please provide all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("institutionCode", institutionCode);
    formData.append("rollNumber", rollNumber);

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/company/verify`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setResult(res.data.message || "Verification complete");
    } catch (err) {
      setResult(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="verify-form-container">
      <h3>Verify Certificate</h3>
      <input type="text" placeholder="Institution code" value={institutionCode} onChange={(e) => setInstitutionCode(e.target.value)} className="text-box"/>
      <input type="text" placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} className="text-box"/>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="file-upload"/>
      <button onClick={handleVerify} className="verify-btn" disabled={!file || !institutionCode || !rollNumber}>Verify</button>

      {result && <p>Result: {result}</p>}
    </div>
  );
}
