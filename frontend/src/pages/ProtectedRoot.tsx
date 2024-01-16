import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "@/api/hooks";
import { Content, Side, Wrap } from "@/layouts";

type Props = {
  redirectTo?: string;
};

export const ProtectedRoot: React.FC<Props> = ({ redirectTo }) => {
  const { user, isLoading } = useCurrentUser();

  if (!user && !isLoading && redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <Wrap>
      <Side>
        {/* {workspace && (
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
        <Button label="Новое пространство" onClick={workspaceModal.open} /> */}
      </Side>
      <Content>
        <Outlet />
      </Content>
    </Wrap>
  );
};
