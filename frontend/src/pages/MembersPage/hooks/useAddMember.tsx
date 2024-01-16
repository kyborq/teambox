import { addMember } from "@/api/services/membersService";
import { useMutation } from "react-query";

export const useAddMember = () => {
  const { mutate } = useMutation(addMember);
  return mutate;
};
