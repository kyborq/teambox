import { Outlet } from "react-router-dom";

type Props = {
  redirectTo?: string;
};

export const Root: React.FC<Props> = () => {
  return <Outlet />;
};
