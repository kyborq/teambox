import { useQuery } from "react-query";
import { getWorkspace } from "../../services/workspaceService";
import { useAppSelector } from "../../../redux/hooks";
import { selectUser } from "../../../redux/slices/userSlice";

export const useCurrentWorkspace = () => {
  const user = useAppSelector(selectUser);

  const { data, refetch } = useQuery(
    ["workspace", user?._id],
    () => getWorkspace(user?._id!),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  return {
    workspace: data,
    getWorkspace: refetch,
  };
};
