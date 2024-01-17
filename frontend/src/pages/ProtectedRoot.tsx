import { Navigate, Outlet } from "react-router-dom";
import {
  useCurrentUser,
  useGetWorkspace,
  useSetWorkspace,
  useWorkspaces,
} from "@/api/hooks";
import { Content, Side, Wrap } from "@/layouts";
import {
  Button,
  IconButton,
  Loader,
  Option,
  Select,
  useSwitch,
} from "@/components";
import { WorkspaceForm } from "@/forms/WorkspaceForm";
import {
  BoxIcon,
  CheckIcon,
  GroupIcon,
  LockIcon,
  LogoutIcon,
  UserIcon,
} from "@/assets/icons";
import { useLogout } from "@/api/hooks/useLogout";

type Props = {
  redirectTo?: string;
};

export const ProtectedRoot: React.FC<Props> = ({ redirectTo }) => {
  const { user, isLoading } = useCurrentUser();
  const workspaces = useWorkspaces();
  const currentWorkspace = useGetWorkspace(user?.workspace);
  const setCurrentWorkspace = useSetWorkspace();

  const logoutUser = useLogout();

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
        {!!user && (
          <Option
            icon={<UserIcon />}
            value={user.name}
            indicator={
              <IconButton icon={<LogoutIcon />} onClick={logoutUser} />
            }
          />
        )}
        <Select value={currentWorkspace?.name || "Не выбрано"}>
          {workspaces.map((w, i) => {
            const personalIcon =
              w.isPersonal && w.owner === user?.id ? <LockIcon /> : <BoxIcon />;
            const workspaceIcon =
              w.owner === user?.id ? personalIcon : <GroupIcon />;

            return (
              <Option
                key={i}
                value={w.name}
                selected={w._id === currentWorkspace?._id}
                indicator={w._id === currentWorkspace?._id && <CheckIcon />}
                icon={workspaceIcon}
                onSelect={() => {
                  setCurrentWorkspace(w._id);
                }}
              />
            );
          })}
        </Select>
        <WorkspaceForm state={workspaceModal} />
        <Button label="Новое пространство" onClick={workspaceModal.open} />
      </Side>
      <Content>
        <Outlet />
      </Content>
    </Wrap>
  );
};
