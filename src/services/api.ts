import axios from "axios";

const api = axios.create({
  baseURL: "https://whatsapp-backend-l6px.onrender.com/api",
  timeout: 100000,
});

export default api;
