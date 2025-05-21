import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";


function LoginPage() {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);
      const userInfo = {
        userName: res.data.userName,
        userId: res.data.userId,
      }
console.log(userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      
      navigate("/home"); // Redirect on successful login
    } catch (err) {
      setError(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="userName" onChange={handleChange} placeholder="Username" required className="border p-2 w-full" />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" required className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
      <p>
          New User? <Link to="/register">Register here</Link>
        </p>
    </div>
  );
}

export default LoginPage;
