import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import { useSearch } from "./SearchContext";
import { getLatestMovies, searchMovies } from "../Services/API";
const HomeContext = createContext();

export const UseHome = () => useContext(HomeContext);

export function HomePageProvider({ children }) {
  const { searchQuery } = useSearch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const initialPage = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurentPage] = useState(initialPage);

  function handlePrevPage() {
    setCurentPage((prev) => prev - 1);
  }
  function handleNextPage() {
    setCurentPage((prev) => prev + 1);
  }

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    const storedUser = localStorage.getItem("TmdbUser");
    if (storedUser) return;
    else {
      navigate("/");
    }
  });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage]);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        const popularMovies = await getLatestMovies(currentPage);
        setMovies(popularMovies);
        setError(null);
      } catch (err) {
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, [searchQuery, currentPage]);

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchQuery.trim()) return;

      try {
        setLoading(true);
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);
        setError(null);
      } catch (err) {
        setError("Failed to search movies...");
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [searchQuery]);

  const value = {
    movies,
    loading,
    error,
    currentPage,
    handleNextPage,
    handlePrevPage,
  };
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}
