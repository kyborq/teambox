import { useMutation, useQueryClient } from "react-query";
import { createWorkspace } from "../services/workspaceService";
import { useAppDispatch } from "../../redux/hooks";
import { setWorkspace } from "../../redux/slices/userSlice";

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { mutate } = useMutation(createWorkspace, {
    onSuccess: (data) => {
      dispatch(setWorkspace(data));
      queryClient.invalidateQueries(["workspaces"]);
    },
    onError: () => {
      dispatch(setWorkspace(null));
    },
  });

  return {
    createWorkspace: mutate,
  };
};
