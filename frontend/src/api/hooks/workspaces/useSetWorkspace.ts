import { setCurrentWorkspace } from "@/api/services/workspaceService";
import { useMutation, useQueryClient } from "react-query";

export const useSetWorkspace = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(setCurrentWorkspace, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  return mutate;
};
