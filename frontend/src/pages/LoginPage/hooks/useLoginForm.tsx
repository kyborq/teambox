import { useForm } from "react-hook-form";

import { useLogin } from "@/api/hooks/useLogin";
import { LoginCredentials } from "@/api/models";

export const useLoginForm = () => {
  const { loginUser, isLoading } = useLogin();
  const { register, handleSubmit } = useForm<LoginCredentials>();

  const onSubmit = (data: LoginCredentials) => {
    loginUser(data);
  };

  return {
    submit: handleSubmit(onSubmit),
    register,
    isLoading,
  };
};
