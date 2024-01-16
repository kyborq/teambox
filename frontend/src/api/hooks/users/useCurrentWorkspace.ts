import { useQuery } from "react-query";
import { useAppDispatch } from "@/redux/hooks";
import { setWorkspace } from "@/redux/slices/userSlice";
import { getCurrentWorkspace } from "@/api/services/userService";

export const useCurrentWorkspace = () => {
  const dispatch = useAppDispatch();

  const { data } = useQuery(["currentWorkspace"], getCurrentWorkspace, {
    retry: true,
    onSuccess: (data) => {
      dispatch(setWorkspace(data));
    },
    onError: () => {
      dispatch(setWorkspace(null));
    },
  });

  return { workspace: data };
};
