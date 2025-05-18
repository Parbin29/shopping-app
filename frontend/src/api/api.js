import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5177/api", // backend api URL
  withCredentials: true, // 👈 This tells Axios to send cookies
});

export default api;
