import { useMutation, useQueryClient } from "react-query";

import { loginUser } from "@/api/services/authService";

export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(loginUser, {
    onSuccess: () => {
      queryClient.refetchQueries(["currentUser"]);
    },
  });

  return {
    loginUser: mutate,
    isLoading,
    isError,
  };
};
