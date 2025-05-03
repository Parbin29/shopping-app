import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5177/api", // Your backend URL
});

export default api;
