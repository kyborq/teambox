import { useQuery } from "react-query";
import { searchUsers } from "../services/userService";
import { ChangeEvent, useEffect, useState } from "react";

export const useSearchUser = (workspace?: string) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, refetch } = useQuery(
    ["users", workspace, searchQuery],
    () => (workspace ? searchUsers(workspace, searchQuery) : null),
    {
      keepPreviousData: true,
    }
  );

  const search = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  useEffect(() => {
    refetch();
  }, [searchQuery]);

  return {
    users: data,
    query: searchQuery,
    search,
  };
};
