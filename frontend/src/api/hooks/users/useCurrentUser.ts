import { getCurrentUser } from "@/api/services/userService";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";
import { useQuery, useQueryClient } from "react-query";

export const useCurrentUser = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery("currentUser", getCurrentUser, {
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
    onError: () => {
      dispatch(setUser(null));
      queryClient.refetchQueries(["currentWorkspace", "workspaces"]);
    },
  });

  return {
    user: user || null,
    isLoading,
  };
};
