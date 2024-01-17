import { addMember } from "@/api/services/membersService";
import { useMutation, useQueryClient } from "react-query";

export const useAddMember = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(["members"]);
    },
  });
  return mutate;
};
