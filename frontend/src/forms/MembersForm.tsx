import { CreateMember } from "@/api/models/memberModel";
import { Button, Field, Form, Modal, SwitchState } from "@/components";
import { useAddMember } from "@/pages/MembersPage/hooks/useAddMember";
import { useForm } from "react-hook-form";

type Props = {
  state: SwitchState;
  workspace: string;
};

export const MembersForm: React.FC<Props> = ({ state, workspace }) => {
  const { register, reset, handleSubmit } = useForm<CreateMember>({
    values: {
      workspace,
      login: "",
    },
  });
  const addMember = useAddMember();

  const onSubmit = (data: CreateMember) => {
    addMember({
      workspace: data.workspace,
      login: data.login,
    });
    handleClose();
  };

  const handleClose = () => {
    state.close();
    reset();
  };

  return (
    <Modal state={state} onClose={handleClose} title="Пригласить пользователей">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field placeholder="Введите логин" {...register("login")} />
        <Button label="Добавить" />
      </Form>
    </Modal>
  );
};
