import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
  error.response?.status === 401 &&
  window.location.pathname !== "/"
) {
  console.warn("Unauthorized request");

  // Don't force logout.
}
    return Promise.reject(error);
  }
);

export default api;