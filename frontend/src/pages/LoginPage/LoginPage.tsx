import { KeyIcon, LogoIcon, UserIcon } from "@/assets/icons";
import { ActionButton, Button, Field, Form } from "@/components";
import { useLoginForm } from "./hooks/useLoginForm";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { register, submit, isLoading, isError, isValid } = useLoginForm();

  const navigate = useNavigate();

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <Form onSubmit={submit}>
      <LogoIcon />
      <Field
        icon={<UserIcon />}
        placeholder="Имя пользователя"
        {...register("login", {
          required: "Введите логин",
        })}
      />
      <Field
        icon={<KeyIcon />}
        placeholder="Пароль"
        obscure
        {...register("password", {
          required: "Введите пароль",
        })}
      />
      <Button
        label="Войти"
        isLoading={isLoading}
        isError={isError}
        isDisabled={!isValid}
      />
      <ActionButton label="Зарегистрироваться" onClick={navigateToRegister} />
    </Form>
  );
};
