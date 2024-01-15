import { useQuery } from "react-query";
import { getCurrentUser } from "../services/userService";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/slices/userSlice";

export const useCurrentUser = () => {
  const dispatch = useAppDispatch();

  useQuery("currentUser", getCurrentUser, {
    staleTime: Infinity,
    cacheTime: Infinity,
    onSuccess: (data) => {
      dispatch(setUser(data));
    },
    onError: () => {
      dispatch(setUser(null));
    },
  });
};
