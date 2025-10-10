// src/pages/CompanyVerify.jsx
import VerifyForm from "../components/VerifyForm";
import Logout from "../components/Logout";
import "./CompanyVerify.css";

export default function CompanyVerify() {
  return (
    <div className="company-page">
      <div className="company-verify-container">
        <h3>Company Verification Dashboard</h3>
        <div className="upload-box">
          <VerifyForm className="upload-box"/>
        </div>
        <div className="logout-container">
          <Logout/>
        </div>
      </div>
    </div>
  );
}
