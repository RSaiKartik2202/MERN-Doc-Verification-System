import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/register", formData);
      // alert(res.data.message || "Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error registering user");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <select name="role" onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Company">Company</option>
            <option value="Institution">Institution</option>
        </select>

        {
          formData.role === "Institution" && (
            <input type="text" name="institutionCode" placeholder="Institution Code" onChange={handleChange} required />
          )
        }

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
