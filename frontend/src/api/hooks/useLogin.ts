import { useMutation, useQueryClient } from "react-query";
import { login } from "../services/authService";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  return {
    loginUser: mutate,
    isLoading,
  };
};
