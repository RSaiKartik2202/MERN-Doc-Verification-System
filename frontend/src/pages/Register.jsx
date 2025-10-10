import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, formData);
      // alert(res.data.message || "Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering user");
    }
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input type="text" name="name" placeholder="Name" onChange={handleChange} className="input-box"/>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-box"/>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input-box"/>
          <select name="role" onChange={handleChange} required className="input-box">
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Company">Company</option>
              <option value="Institution">Institution</option>
          </select>

          {
            formData.role === "Institution" && (
              <input type="text" name="institutionCode" placeholder="Institution Code" onChange={handleChange} required className="input-box"/>
            )
          }

          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
}
