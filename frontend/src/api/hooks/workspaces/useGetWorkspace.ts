import { getWorkspace } from "@/api/services/workspaceService";
import { useAppDispatch } from "@/redux/hooks";
import { setWorkspace } from "@/redux/slices/userSlice";
import { useQuery } from "react-query";

export const useGetWorkspace = (workspaceId?: string) => {
  const dispatch = useAppDispatch();

  const { data } = useQuery(
    ["currentWorkspace", workspaceId],
    () => (workspaceId ? getWorkspace(workspaceId) : null),
    {
      enabled: !!workspaceId,
      retry: true,
      onSuccess: (data) => {
        dispatch(setWorkspace(data));
      },
      onError: () => {
        dispatch(setWorkspace(null));
      },
    }
  );

  return data || null;
};
