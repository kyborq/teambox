import { useCreateWorkspace } from "@/api/hooks";
import { CreateWorkspace } from "@/api/models";
import { Button, Field, Form, Modal, SwitchState } from "@/components";
import { useForm } from "react-hook-form";

type Props = {
  state: SwitchState;
};

export const WorkspaceForm: React.FC<Props> = ({ state }) => {
  const { register, handleSubmit, reset } = useForm<CreateWorkspace>();
  const { createWorkspace } = useCreateWorkspace();

  const onSubmit = (data: CreateWorkspace) => {
    createWorkspace(data);
    reset();
    state.close();
  };

  return (
    <Modal state={state} title="Новое пространство">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field placeholder="Название" {...register("name")} />
        <Button label="Создать" />
      </Form>
    </Modal>
  );
};
