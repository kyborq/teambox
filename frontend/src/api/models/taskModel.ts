export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  REVIEW = "review",
  COMPLETED = "completed",
}

export type Task = {
  _id: string;
  alias: string;
  author: string;
  status: TaskStatus;
  title: string;
  workspace: string;
};

export type CreateTask = {
  workspace: string;
  title: string;
};
