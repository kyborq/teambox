import { useMutation, useQueryClient } from "react-query";
import { createWorkspace } from "../../services/workspaceService";
import { useAppDispatch } from "../../../redux/hooks";
import { setWorkspace } from "../../../redux/slices/userSlice";
import { useSetWorkspace } from "./useSetWorkspace";

export const useCreateWorkspace = () => {
  const setCurrentWorkspace = useSetWorkspace();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { mutate } = useMutation(createWorkspace, {
    onSuccess: (data) => {
      dispatch(setWorkspace(data));
      setCurrentWorkspace(data._id);
      queryClient.invalidateQueries(["workspaces"]);
    },
    onError: () => {
      // dispatch(setWorkspace(null));
    },
  });

  return {
    createWorkspace: mutate,
  };
};
