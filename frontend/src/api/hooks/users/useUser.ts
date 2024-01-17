import { getUserByLogin } from "@/api/services/userService";
import { useQuery } from "react-query";

export const useUser = (login: string) => {
  const { data: user, refetch: searchUser } = useQuery(
    ["userSearch", login],
    () => getUserByLogin(login)
  );

  return { user, searchUser };
};
