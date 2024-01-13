import { api } from "../api";
import { LoginCredentials } from "../models";

export const login = async (loginCredentials: LoginCredentials) => {
  await api.post("/auth/login", loginCredentials);
};

export const logout = async () => {
  await api.get("/auth/logout");
};

export const refresh = async () => {
  await api.get("/auth/refresh");
};
