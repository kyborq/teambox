import { Navigate, Outlet } from "react-router-dom";
import {
  useCurrentUser,
  useGetWorkspace,
  useSetWorkspace,
  useWorkspaces,
} from "@/api/hooks";
import { Content, Side, Wrap } from "@/layouts";
import { Button, Loader, Select, useSwitch } from "@/components";
import { WorkspaceForm } from "@/forms/WorkspaceForm";

type Props = {
  redirectTo?: string;
};

export const ProtectedRoot: React.FC<Props> = ({ redirectTo }) => {
  const { user, isLoading } = useCurrentUser();
  const workspaces = useWorkspaces();
  const currentWorkspace = useGetWorkspace(user?.workspace);
  const setCurrentWorkspace = useSetWorkspace();

  const workspaceModal = useSwitch();

  if (!user && !isLoading && redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Wrap>
      <Side>
        <Select
          items={workspaces.map((w) => w.name)}
          value={currentWorkspace?.name || "Не выбрано"}
          onSelect={(index) => {
            const option = workspaces[index];
            setCurrentWorkspace(option._id);
          }}
        />
        <WorkspaceForm state={workspaceModal} />
        <Button label="Новое пространство" onClick={workspaceModal.open} />
      </Side>
      <Content>
        <Outlet />
      </Content>
    </Wrap>
  );
};
