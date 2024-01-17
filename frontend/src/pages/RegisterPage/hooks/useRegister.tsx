import { registerUser } from "@/api/services/authService";
import { useMutation, useQueryClient } from "react-query";

export const useRegister = () => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(registerUser, {
    onSuccess: () => {
      queryClient.refetchQueries(["currentUser"]);
    },
  });

  return {
    registerUser: mutate,
    isLoading,
    isError,
  };
};
