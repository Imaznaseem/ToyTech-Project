import axios from "axios";
import { updateCsrfToken } from "./utils"; // Anpassa om sökvägen är annorlunda

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Din API-bas-URL
  withCredentials: true, // Skicka HttpOnly cookies med varje förfrågan
});

export const getCsrfToken = async () => {
  console.log("Hämtar CSRF-token med fetch...");
  const response = await fetch("/api/csrf/", {
    method: "GET",
    credentials: "include", // Skicka cookies
  });
  const data = await response.json();
  console.log("Fick CSRF-token:", data.csrfToken);
  return data.csrfToken;
};

// Interceptor för att inkludera CSRF-token i headers
api.interceptors.request.use(
  async (config) => {
    if (!config.headers["X-CSRFToken"]) {
      const csrfToken = await getCsrfToken(); // Hämta CSRF-token om den inte finns i headers
      config.headers["X-CSRFToken"] = csrfToken; // Lägg till CSRF-token i headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const logout = async () => {
  try {
      const response = await api.post("/api/admin/logout/", null, {
          headers: {
              "X-CSRFToken": updateCsrfToken(), // Hämta aktuell CSRF-token
          },
          withCredentials: true, // Se till att cookies skickas
      });
      console.log("Utloggning lyckades:", response.data);
      return response.data;
  } catch (error) {
      console.error("Ett fel uppstod vid utloggning:", error.response || error);
      throw error;
  }
};

export default api;
