import axios from "axios";

const baseURL = (import.meta as any).env?.VITE_API_BASE_URL || "/api";

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("app_jwt");
  if (token) {
    if (!config.headers) {
      config.headers = {} as typeof config.headers;
    }
    (config.headers as any)["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default api;
