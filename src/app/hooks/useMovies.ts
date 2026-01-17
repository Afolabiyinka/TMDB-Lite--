import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { getLatestMovies } from "../services/Request";
import { useQuery } from "@tanstack/react-query";
import type { MovieType } from "../types/movie";

export default function useMovies() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [movies, setMovies] = useState<MovieType[]>([]);

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);

  // Sync page with URL
  useEffect(() => {
    const allowedPaths = ["/"];
    if (allowedPaths.includes(location.pathname)) {
      setSearchParams({ page: currentPage.toString() });
    }
  }, [currentPage, location.pathname, setSearchParams]);

  // Scroll top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [currentPage]);

  // Fetch movies
  const { data, isLoading, error } = useQuery({
    queryKey: ["Movies", currentPage],
    queryFn: () => getLatestMovies(currentPage),
  });

  useEffect(() => {
    try {
      if (data) {
        setMovies(data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [data]);

  return {
    movies,
    isLoading,
    error,
    currentPage,
    handleNextPage,
    handlePrevPage,
  };
}
