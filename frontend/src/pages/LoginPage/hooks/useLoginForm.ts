import { useForm } from "react-hook-form";

import { LoginCredentials } from "@/api/models";
import { useLogin } from "./useLogin";

export const useLoginForm = () => {
  const { loginUser, isLoading, isError } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginCredentials>();

  const onSubmit = (data: LoginCredentials) => {
    loginUser(data);
  };

  return {
    submit: handleSubmit(onSubmit),
    register,
    isLoading,
    isValid,
    isError,
  };
};
