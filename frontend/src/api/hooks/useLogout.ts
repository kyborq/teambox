import { useMutation, useQueryClient } from "react-query";
import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { setUser, setWorkspace } from "@/redux/slices/userSlice";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const { mutate: logoutUser } = useMutation(logout, {
    onSuccess: () => {
      dispatch(setUser(null));
      dispatch(setWorkspace(null));
      queryClient.removeQueries("currentUser", { exact: true });
      navigate("/login");
    },
  });

  return logoutUser;
};
