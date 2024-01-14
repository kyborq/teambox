import { useQuery } from "react-query";
import { currentWorkspaces } from "../services/workspaceService";

export const useWorkspaces = () => {
  const { data } = useQuery("workspaces", currentWorkspaces, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return data || [];
};
