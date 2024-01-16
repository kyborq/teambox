import { getMembers } from "@/api/services/membersService";
import { useQuery } from "react-query";

export const useMembers = (workspaceId?: string) => {
  const { data } = useQuery(
    ["members", workspaceId],
    () => (workspaceId ? getMembers(workspaceId) : null),
    {
      enabled: !!workspaceId,
    }
  );

  return data || [];
};
