/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://your-api-domain.com/api",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config: any) => {
    // Add token from localStorage if exists
    const token = localStorage.getItem("jwt_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: any) => response,
  (error: AxiosError) => {
    // Handle specific error status codes
    if (error.response) {
      switch (error.response.status) {
        case 400:
          console.error("Bad Request:", error.response.data);
          break;
        case 401:
          // Unauthorized - typically means token is invalid
          localStorage.removeItem("jwt_token");
          window.location.href = "/";
          break;
        case 403:
          console.error("Forbidden:", error.response.data);
          window.location.href = "/unauthorized";
          break;
        case 404:
          console.error("Not Found:", error.response.data);
          window.location.href = "/404";
          break;
        case 500:
          console.error("Server Error:", error.response.data);
          break;
        default:
          console.error("Unexpected Error:", error.response.data);
      }
    } else if (error.request) {
      // Request made but no response received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }

    return Promise.reject(error);
  }
);

// Helper functions for different HTTP methods
export const apiService = {
  get: (url: string, params?: any) => api.get(url, { params }),
  post: (url: string, payload: any) => api.post(url, payload),
  put: (url: string, payload: any) => api.put(url, payload),
  patch: (url: string, payload: any) => api.patch(url, payload),
  delete: (url: string) => api.delete(url),
};

export default api;
