import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:5177/api", // Your backend URL
});

export default api;
