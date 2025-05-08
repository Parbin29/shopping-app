import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    role: ""
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post("/auth/register", formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <div className="text-red-600 mb-2">{JSON.stringify(error)}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="userName" onChange={handleChange} placeholder="Username" className="border p-2 w-full" required />
        {/* <input type="email" name="email" onChange={handleChange} placeholder="Email" className="border p-2 w-full" required />
        <input name="phoneNumber" onChange={handleChange} placeholder="Phone Number" className="border p-2 w-full" /> */}
        <input type="password" name="password" onChange={handleChange} placeholder="Password" className="border p-2 w-full" required />
        <input name="role" onChange={handleChange} placeholder="Role" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
