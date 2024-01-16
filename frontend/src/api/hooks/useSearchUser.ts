import { useQuery } from "react-query";
import { searchUsers } from "../services/userService";
import { ChangeEvent, useEffect, useState } from "react";

export const useSearchUser = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, refetch } = useQuery(
    ["searchUsers", searchQuery],
    () => (!!searchQuery ? searchUsers(searchQuery) : null),
    {
      enabled: !!searchQuery,
      keepPreviousData: true,
    }
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(e.target.value);

  const resetQuery = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    refetch();
  }, [searchQuery]);

  return {
    users: data,
    searchQuery,
    handleSearch,
    resetQuery,
  };
};
