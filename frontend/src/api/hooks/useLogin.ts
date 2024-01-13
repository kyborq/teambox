import { useMutation, useQueryClient } from "react-query";
import { login } from "../services/authService";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  return {
    loginUser: mutate,
  };
};
