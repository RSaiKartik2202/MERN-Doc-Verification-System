import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, formData);
      login(res.data.user, res.data.token);
      // alert("Login successful!");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input-box"/>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="input-box"/>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
