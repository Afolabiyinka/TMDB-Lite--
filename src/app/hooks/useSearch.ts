import { useLocation } from "react-router-dom";
import { useSearchStore } from "../store/searchStore";
import { useEffect } from "react";
import { searchMovies } from "../services/Request";
import { useQuery } from "@tanstack/react-query";

export const useSearch = () => {
  const { searchQuery, setSearchQuery } = useSearchStore();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";

  useEffect(() => {
    if (query?.trim()) {
      setSearchQuery(query);
    }
  }, [query, setSearchQuery]);

  const {
    data: searchresults = [],
    error: searchError,
    isLoading: searchLoading,
  } = useQuery({
    queryKey: ["Searchresults", searchQuery],
    queryFn: () => searchMovies(searchQuery),
    enabled: !!searchQuery.trim(),
  });
  return {
    searchLoading,
    searchresults,
    searchError,
  };
};
