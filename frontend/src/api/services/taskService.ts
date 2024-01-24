import { api } from "../api";
import { CreateTask, Task } from "../models";

export const createTask = async (task: CreateTask) => {
  await api.post(`/tasks/${task.workspace}`, { title: task.title });
};

export const getTasks = async (workspaceId: string) => {
  const { data: tasks } = await api.get<Task[]>(`/tasks/${workspaceId}`);
  return tasks;
};
