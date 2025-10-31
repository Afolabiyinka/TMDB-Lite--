import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useSearch } from "./SearchContext";
import { getLatestMovies, searchMovies } from "../services/Request";

export interface MovieType {
  id: number | string;
  title?: string;
  poster?: string;
  [key: string]: any;
}

export default function useHomePage() {
  const { searchQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);

  // Sync page with URL
  useEffect(() => {
    const allowedPaths = ["/movies"];
    if (allowedPaths.includes(location.pathname)) {
      setSearchParams({ page: currentPage.toString() });
    }
  }, [currentPage, location.pathname, setSearchParams]);

  // Redirect if not logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("TmdbUser");
    if (!storedUser) navigate("/");
  }, [navigate]);

  // Scroll top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [currentPage]);

  // Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        if (searchQuery.trim()) {
          const searchResults = await searchMovies(searchQuery);
          setMovies(searchResults);
        } else {
          const popularMovies = await getLatestMovies(currentPage);
          setMovies(popularMovies);
        }
        setError(null);
      } catch {
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, currentPage]);

  return {
    movies,
    loading,
    error,
    currentPage,
    handleNextPage,
    handlePrevPage,
  };
}
