import { KeyIcon, LogoIcon, UserIcon } from "@/assets/icons";
import { Button, Field, Form } from "@/components";
import { useRegisterForm } from "./hooks/useRegisterForm";

export const RegisterPage = () => {
  const { register } = useRegisterForm();

  return (
    <Form>
      <LogoIcon />
      <Field
        icon={<UserIcon />}
        placeholder="Полное имя"
        {...register("name", {
          required: "Введите имя",
        })}
      />
      <Field
        icon={<UserIcon />}
        placeholder="Логин"
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
      <Button label="Зарегистрироватся" />
    </Form>
  );
};
