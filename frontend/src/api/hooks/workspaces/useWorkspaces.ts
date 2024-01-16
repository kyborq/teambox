import { useQuery } from "react-query";
import { currentWorkspaces } from "../../services/workspaceService";

export const useOwnedWorkspaces = () => {
  const { data } = useQuery("workspaces", currentWorkspaces, {
    retry: true,
  });

  return data || [];
};
