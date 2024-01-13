import axios from "axios";
import { refresh } from "./services/authService";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = false;
      await refresh();

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
