import { useCurrentUser } from "@/api/hooks";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  redirectTo?: string;
};

export const Root: React.FC<Props> = ({ redirectTo }) => {
  const { user, isLoading } = useCurrentUser();

  if (user && !isLoading && redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!isLoading && !user) {
    return <Outlet />;
  }

  return null;
};
