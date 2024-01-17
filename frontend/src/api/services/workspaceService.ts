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

export const getWorkspace = async (workspaceId: string) => {
  const { data: workspace } = await api.get<Workspace>(
    `/workspaces/${workspaceId}`
  );

  return workspace;
};

export const setCurrentWorkspace = async (workspace: string) => {
  try {
    await api.patch(`/workspaces/${workspace}`);
  } catch (e) {
    throw e;
  }
};
