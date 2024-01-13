import { KeyIcon, LogoIcon, UserIcon } from "../../assets/icons";
import { Button } from "../../components/Button";
import { Field } from "../../components/Field";
import { Form } from "../../components/Form";
import { useLoginForm } from "./hooks/useLoginForm";

export const LoginPage = () => {
  const { register, submit } = useLoginForm();

  return (
    <>
      <Form onSubmit={submit}>
        <LogoIcon />
        <Field
          icon={<UserIcon />}
          placeholder="Имя пользователя"
          {...register("login")}
        />
        <Field
          icon={<KeyIcon />}
          placeholder="Пароль"
          obscure
          {...register("password")}
        />
        <Button label="Войти" />
      </Form>
    </>
  );
};
