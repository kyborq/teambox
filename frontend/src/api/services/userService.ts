import { api } from "../api";
import { User } from "../models";

export const getCurrentUser = async () => {
  try {
    const { data: currentUser } = await api.get<User>("/users/current");
    return currentUser;
  } catch (e) {
    throw e;
  }
};

export const getUserByLogin = async (login: string) => {
  try {
    const { data: user } = await api.get<User>(`/users/${login}`);
    return user;
  } catch (e) {
    throw e;
  }
};
