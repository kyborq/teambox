import { KeyIcon, LogoIcon, UserIcon } from "@/assets/icons";
import { ActionButton, Button, Field, Form } from "@/components";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const { register, submit } = useRegisterForm();
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <Form onSubmit={submit}>
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
      <ActionButton label="Уже есть профиль" onClick={navigateToLogin} />
    </Form>
  );
};
