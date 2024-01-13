import { useQuery } from "react-query";
import { getCurrentUser } from "../services/userService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectUser, setUser } from "../../redux/slices/userSlice";

export const useCurrentUser = () => {
  const user = useAppSelector(selectUser);
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

  return user;
};
