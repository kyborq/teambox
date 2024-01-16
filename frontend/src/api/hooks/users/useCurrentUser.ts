import { getCurrentUser } from "@/api/services/userService";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/userSlice";
import { useQuery } from "react-query";

export const useCurrentUser = () => {
  const dispatch = useAppDispatch();

  const { data: user, isLoading } = useQuery("currentUser", getCurrentUser, {
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
    onError: () => {
      dispatch(setUser(null));
    },
  });

  return {
    user: user || null,
    isLoading,
  };
};
