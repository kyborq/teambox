import { getTasks } from "@/api/services/taskService";
import { useQuery } from "react-query";

export const useTasks = (workspace?: string) => {
  const { data } = useQuery(["tasks", workspace], () =>
    workspace ? getTasks(workspace) : null
  );

  return data || [];
};
