import { api } from "../api";
import { CreateWorkspace, Workspace } from "../models";

export const currentWorkspaces = async () => {
  const { data: workspaces } = await api.get<Workspace[]>("/workspaces");

  return workspaces;
};

export const createWorkspace = async (workspaceCreate: CreateWorkspace) => {
  const { data: workspace } = await api.post<Workspace>(
    "/workspaces",
    workspaceCreate
  );

  return workspace;
};
