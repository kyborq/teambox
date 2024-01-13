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
