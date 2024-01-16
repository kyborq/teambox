import { Navigate, Outlet } from "react-router-dom";
import {
  useCurrentUser,
  useCurrentWorkspace,
  useOwnedWorkspaces,
} from "@/api/hooks";
import { Content, Side, Wrap } from "@/layouts";
import { Button, Loader, Select, useSwitch } from "@/components";
import { WorkspaceForm } from "@/forms/WorkspaceForm";
import { useSetWorkspace } from "@/api/hooks/workspaces/useSetWorkspace";

type Props = {
  redirectTo?: string;
};

export const ProtectedRoot: React.FC<Props> = ({ redirectTo }) => {
  const { user, isLoading } = useCurrentUser();
  const { workspace } = useCurrentWorkspace();
  const setCurrentWorkspace = useSetWorkspace();
  const ownedWorkspaces = useOwnedWorkspaces();

  const workspaceModal = useSwitch();

  if (!user && !isLoading && redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!workspace) {
    return <Loader />;
  }

  return (
    <Wrap>
      <Side>
        <Select
          items={ownedWorkspaces.map((w) => w.name)}
          value={workspace.name}
          onSelect={(index) => {
            const option = ownedWorkspaces[index];
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
