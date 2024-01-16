import { api } from "../api";
import { User, Workspace } from "../models";

export const getCurrentUser = async () => {
  try {
    const { data: currentUser } = await api.get<User>("/users/current");
    return currentUser;
  } catch (e) {
    throw e;
  }
};

export const searchUsers = async (login: string) => {
  try {
    const { data: users } = await api.get<User[]>(`/users/search/${login}`);
    return users;
  } catch (e) {
    throw e;
  }
};

export const setCurrentWorkspace = async (workspace: string) => {
  try {
    await api.put(`/users/${workspace}`);
  } catch (e) {
    throw e;
  }
};

export const getCurrentWorkspace = async () => {
  try {
    const { data: workspace } = await api.get<Workspace>(`/users/workspace`);
    return workspace;
  } catch (e) {
    throw e;
  }
};
