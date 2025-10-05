// src/components/VerifyForm.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

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
      const res = await axios.post(`{import.meta.env.VITE_BACKEND_URL}/api/company/verify`, formData, {
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
    <div>
      <h3>Verify Certificate</h3>
      <input type="text" placeholder="Institution code" value={institutionCode} onChange={(e) => setInstitutionCode(e.target.value)} />
      <input type="text" placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleVerify}>Verify</button>

      {result && <p>Result: {result}</p>}
    </div>
  );
}
