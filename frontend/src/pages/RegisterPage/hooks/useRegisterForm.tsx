import { RegisterCredentials } from "@/api/models";
import { useForm } from "react-hook-form";
import { useRegister } from "./useRegister";

export const useRegisterForm = () => {
  const { register, handleSubmit } = useForm<RegisterCredentials>();
  const { registerUser } = useRegister();

  const onSubmit = (data: RegisterCredentials) => {
    registerUser(data);
  };

  return { register, registerUser, submit: handleSubmit(onSubmit) };
};
