import { api } from "../api";
import { LoginCredentials, RegisterCredentials } from "../models";

export const loginUser = async (loginCredentials: LoginCredentials) => {
  await api.post("/auth/login", loginCredentials);
};

export const registerUser = async (
  registerCredentials: RegisterCredentials
) => {
  await api.post("/auth/register", registerCredentials);
};

export const logout = async () => {
  return await api.get("/auth/logout");
};

export const refresh = async () => {
  await api.get("/auth/refresh");
};
