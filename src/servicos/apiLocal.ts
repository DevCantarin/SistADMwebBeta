import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000"
  // baseURL: "exp://192.168.15.12:19000"
})

export default api;