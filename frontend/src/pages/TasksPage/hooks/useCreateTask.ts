import { createTask } from "@/api/services/taskService";
import { useMutation, useQueryClient } from "react-query";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  return {
    createTask: mutate,
  };
};
