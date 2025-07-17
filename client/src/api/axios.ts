import axios from "axios";
import { getToken } from "../utils/token";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  withCredentials: false, 
});

// Add token to request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
