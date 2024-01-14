import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../api/hooks/useCurrentUser";
import {
  Button,
  Content,
  Field,
  Logo,
  Navigation,
  Select,
  Side,
  Wrap,
} from "../components";
import { useModal } from "../components/ui/Modal/hooks/useModal";
import { Modal } from "../components/ui/Modal";
import { useForm } from "react-hook-form";
import { useCreateWorkspace } from "../api/hooks/useCreateWorkspace";
import { CreateWorkspace } from "../api/models";
import { useWorkspaces } from "../api/hooks/useWorkspaces";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectWorkspace, setWorkspace } from "../redux/slices/userSlice";

type Props = {
  redirectTo: string;
};

export const ProtectedRoot: React.FC<Props> = ({ redirectTo }) => {
  const { register, handleSubmit } = useForm<CreateWorkspace>();

  const { createWorkspace } = useCreateWorkspace();
  const workspaces = useWorkspaces();

  const workspace = useAppSelector(selectWorkspace);

  const onSumbit = (data: CreateWorkspace) => {
    createWorkspace(data);
    workspaceModal.close();
    // ...
  };

  const user = useCurrentUser();
  const dispatch = useAppDispatch();

  const workspaceModal = useModal();

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <>
      <Wrap>
        <Side>
          <Logo />
          <Navigation to="" label="Команда" />
          <Navigation to="tasks" label="Задачи" />
          <div style={{ flex: 1 }} />
          <Select
            value={workspace?.name || "Не выбрано"}
            items={workspaces
              // .filter((w) => w.name !== workspace?.name)
              .map((w) => w.name)}
            onSelect={(id) => dispatch(setWorkspace(workspaces[id]))}
          />
          <Button label="Новое пространство" onClick={workspaceModal.open} />
        </Side>
        <Content>
          <Outlet />
        </Content>
      </Wrap>

      <Modal title="Новое пространство" state={workspaceModal}>
        <Field placeholder="Название" {...register("name")} />
        <Button label="Создать" onClick={() => handleSubmit(onSumbit)()} />
      </Modal>
    </>
  );
};
