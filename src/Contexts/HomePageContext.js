import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

import { useSearch } from "./SearchContext";
import { getLatestMovies, searchMovies } from "../Services/API";

const HomeContext = createContext();
export const UseHome = () => useContext(HomeContext);

export function HomePageProvider({ children }) {
  const { searchQuery } = useSearch();

  // Routing helpers
  const navigate = useNavigate();
  const location = useLocation();
  const showSearchParams = ["/movies"];
  const [searchParams, setSearchParams] = useSearchParams();

  // State management
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const initialPage = parseInt(searchParams.get("page") || 1);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Page navigation handlers
  function handlePrevPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  function handleNextPage() {
    setCurrentPage((prev) => prev + 1);
  }

  // Update URL with current page if on allowed paths
  useEffect(() => {
    if (showSearchParams.includes(location.pathname)) {
      setSearchParams({ page: currentPage });
    }
  }, [currentPage, location.pathname, setSearchParams]);

  // Redirect to login if user not found
  useEffect(() => {
    const storedUser = localStorage.getItem("TmdbUser");
    if (!storedUser) {
      navigate("/");
    }
  }, [navigate]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage]);

  // Fetch either popular or searched movies
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
      } catch (err) {
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, currentPage]);

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
