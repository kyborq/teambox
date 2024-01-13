import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../api/hooks/useCurrentUser";

type Props = {
  redirectTo: string;
};

export const ProtectedRoot: React.FC<Props> = ({ redirectTo }) => {
  const user = useCurrentUser();

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
