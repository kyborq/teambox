import { useMutation } from "react-query";
import { createWorkspace } from "../services/workspaceService";
import { useAppDispatch } from "../../redux/hooks";
import { setWorkspace } from "../../redux/slices/userSlice";

export const useCreateWorkspace = () => {
  const dispatch = useAppDispatch();

  const { mutate } = useMutation(createWorkspace, {
    onSuccess: (data) => {
      dispatch(setWorkspace(data));
    },
    onError: () => {
      dispatch(setWorkspace(null));
    },
  });

  return {
    createWorkspace: mutate,
  };
};
