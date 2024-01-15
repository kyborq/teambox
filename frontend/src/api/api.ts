import axios from "axios";
import { refresh } from "./services/authService";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const errorHandler = async () => {
  await refresh();
};

createAuthRefreshInterceptor(api, errorHandler, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});
