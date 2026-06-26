import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "@/app/services/movie.requests";
import { useDebounce } from "../shared/useDebounce";

export const useSearch = () => {

  const [query, setQuery] = useState("")

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