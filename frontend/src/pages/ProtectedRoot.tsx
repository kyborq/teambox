import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../api/hooks/useCurrentUser";
import { Content, Logo, Navigation, Side, Wrap } from "../components";
import { shortName } from "../utils/shortName";

type Props = {
  redirectTo: string;
};

export const ProtectedRoot: React.FC<Props> = ({ redirectTo }) => {
  const user = useCurrentUser();

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <Wrap>
      <Side>
        <Logo />
        <Navigation to="" label="Команда" />
        <Navigation to="tasks" label="Задачи" />
        <div style={{ flex: 1 }} />
        <Navigation to="profile" label={shortName(user.name)} />
      </Side>
      <Content>
        <Outlet />
      </Content>
    </Wrap>
  );
};
