import {
  useCurrentUser,
  useCurrentWorkspace,
  useOwnedWorkspaces,
} from "@/api/hooks";
import { Button, Select } from "@/components";
import { Side, Wrap } from "@/layouts";
import { Navigate } from "react-router-dom";

type Props = {
  redirectTo?: string;
};

export const ProtectedRoot: React.FC<Props> = ({ redirectTo }) => {
  const { user, isLoading } = useCurrentUser();
  const ownedWorkspaces = useOwnedWorkspaces();
  const { workspace, setWorkspace } = useCurrentWorkspace();

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
        <Button label="Новое пространство" />
      </Side>
    </Wrap>
  );
};
