import { useQuery } from "react-query";
import { currentWorkspaces } from "../../services/workspaceService";

export const useWorkspaces = () => {
  const { data } = useQuery("workspaces", currentWorkspaces, {
    retry: true,
    refetchOnWindowFocus: true,
  });

  return data || [];
};
