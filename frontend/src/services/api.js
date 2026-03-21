import axios from "axios";

// 🌍 URL API (Vercel en prod, localhost en dev)
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// 🔗 Instance Axios
const API = axios.create({
  baseURL: API_URL,
  timeout: 10000, // ⏱️ évite les requêtes bloquées
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Interceptor REQUEST (ajout token)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Interceptor RESPONSE (gestion erreurs globale)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔍 Debug utile
    console.error("API ERROR:", error.response || error.message);

    // 🔐 Si token expiré → logout auto
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;