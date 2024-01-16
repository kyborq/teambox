import { setCurrentWorkspace } from "@/api/services/userService";
import { useMutation, useQueryClient } from "react-query";

export const useSetWorkspace = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(setCurrentWorkspace, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentWorkspace"]);
    },
  });

  return mutate;
};
