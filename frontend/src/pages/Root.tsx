import { useCurrentUser } from "@/api/hooks";
import { Loader } from "@/components";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  redirectTo?: string;
};

export const Root: React.FC<Props> = ({ redirectTo }) => {
  const { user, isLoading } = useCurrentUser();

  if (user && redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!user && !isLoading) {
    return <Outlet />;
  }

  return <Loader />;
};
