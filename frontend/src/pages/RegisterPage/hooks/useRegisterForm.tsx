import { RegisterCredentials } from "@/api/models";
import { useForm } from "react-hook-form";

export const useRegisterForm = () => {
  const { register } = useForm<RegisterCredentials>();

  return { register };
};
