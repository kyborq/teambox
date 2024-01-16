import { Navigate, Outlet } from "react-router-dom";
import {
  useCurrentUser,
  useCurrentWorkspace,
  useOwnedWorkspaces,
} from "@/api/hooks";
import { Button, Select, useSwitch } from "@/components";
import { Side, Wrap } from "@/layouts";
import { WorkspaceForm } from "@/forms/WorkspaceForm";

type Props = {
  redirectTo?: string;
};

export const ProtectedRoot: React.FC<Props> = ({ redirectTo }) => {
  const { user, isLoading } = useCurrentUser();
  const { workspace, setWorkspace } = useCurrentWorkspace();
  const ownedWorkspaces = useOwnedWorkspaces();
  const workspaceModal = useSwitch();

  if (!user && !isLoading && redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <Wrap>
      <Side>
        {workspace && (
          <Select
            items={ownedWorkspaces.map((w) => w.name)}
            value={workspace.name}
            onSelect={(index) => {
              const option = ownedWorkspaces[index];
              setWorkspace(option._id);
            }}
          />
        )}
        <WorkspaceForm state={workspaceModal} />
        <Button label="Новое пространство" onClick={workspaceModal.open} />
      </Side>
      <Outlet />
    </Wrap>
  );
};
