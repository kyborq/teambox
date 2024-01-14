import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../api/hooks/useCurrentUser";
import {
  Button,
  Content,
  Field,
  Logo,
  Navigation,
  Side,
  Wrap,
} from "../components";
import { shortName } from "../utils/shortName";
import { useModal } from "../components/ui/Modal/hooks/useModal";
import { Modal } from "../components/ui/Modal";
import { useForm } from "react-hook-form";
import { useCreateWorkspace } from "../api/hooks/useCreateWorkspace";
import { CreateWorkspace } from "../api/models";
import { useWorkspaces } from "../api/hooks/useWorkspaces";
import { useAppSelector } from "../redux/hooks";
import { selectWorkspace } from "../redux/slices/userSlice";

type Props = {
  redirectTo: string;
};

export const ProtectedRoot: React.FC<Props> = ({ redirectTo }) => {
  const { register, handleSubmit } = useForm<CreateWorkspace>();

  const { createWorkspace } = useCreateWorkspace();
  useWorkspaces();

  const workspace = useAppSelector(selectWorkspace);

  const onSumbit = (data: CreateWorkspace) => {
    createWorkspace(data);
    workspaceModal.close();
    // ...
  };

  const user = useCurrentUser();

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
          <Navigation
            to="profile"
            label={workspace?.name || shortName(user.name)}
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
