import { KeyIcon, LogoIcon, UserIcon } from "../../assets/icons";
import { Button } from "../../components/ui/Button";
import { Field } from "../../components/ui/Field";
import { Form } from "../../components/ui/Form";
import { useLoginForm } from "./hooks/useLoginForm";

export const LoginPage = () => {
  const { register, submit, isLoading } = useLoginForm();

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
        <Button label="Войти" isLoading={isLoading} />
      </Form>
    </>
  );
};
