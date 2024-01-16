import { KeyIcon, LogoIcon, UserIcon } from "@/assets/icons";
import { Button, Field, Form } from "@/components";
import { useLoginForm } from "./hooks/useLoginForm";

export const LoginPage = () => {
  const { register, submit, isLoading, isError, isValid } = useLoginForm();

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
    </Form>
  );
};
