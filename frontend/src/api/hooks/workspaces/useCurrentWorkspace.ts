import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser, setWorkspace } from "@/redux/slices/userSlice";
import { getWorkspace } from "@/api/services/workspaceService";
import { setCurrentWorkspace } from "@/api/services/userService";

export const useCurrentWorkspace = () => {
  const queryClient = useQueryClient();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const { data, refetch } = useQuery(
    ["workspace", user?.workspace],
    () => getWorkspace(user?.workspace!),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!user?.workspace,
      keepPreviousData: true,
      onSuccess: (data) => {
        dispatch(setWorkspace(data));
      },
      onError: () => {
        dispatch(setWorkspace(null));
      },
    }
  );

  const { mutate } = useMutation(setCurrentWorkspace, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      refetch();
    },
  });

  return {
    workspace: data,
    getWorkspace: refetch,
    setWorkspace: mutate,
  };
};
