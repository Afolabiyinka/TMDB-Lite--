import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/app/services/movieRequest";
import { useDebounce } from "../useDebounce";

export const useSearch = () => {

  const [query, setQuery] = useState("")

  // const query = useMemo(() => {
  //   return new URLSearchParams(location.search).get("q") || "";
  // }, [location.search]);

  // // local input state (for instant typing UX)
  // const setQuery = (value: string) => {
  //   navigate(`/search?q=${encodeURIComponent(value)}`);
  // };

  const debouncedQuery = useDebounce(query, 700);

  const {
    data: searchresults,
    error: searchError,
    isLoading: searchLoading, refetch
  } = useQuery({
    queryKey: ["search-results", debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: !!debouncedQuery.trim(),
    retry: false,
    refetchOnWindowFocus: false,
  });
  return {
    searchLoading,
    searchresults,
    searchError,
    query,
    setQuery,
    refetch
  };
};