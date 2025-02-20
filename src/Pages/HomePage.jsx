import { useState, useEffect } from "react";
import { getLatestMovies, searchMovies } from "../Services/API";
import MovieCard from "../Components/Movie Components/MovieCard";
import { useTheme } from "../Contexts/ThemeContext";
import Lottie from "lottie-react";
import loadingAnimation from "../Assets/LoadingAnimations.json";
import errorAnimation from "../Assets/ErrorAnimation.json";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    const loadLatestMovies = async () => {
      try {
        setLoading(true);
        const latestMovies = await getLatestMovies();
        setMovies(latestMovies);
      } catch (err) {
        setError(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    loadLatestMovies();
  }, []);

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   if (!searchQuery.trim()) return;
  //   if (loading) return;
  //   setLoading(true);
  //   try {
  //     const searchResults = await searchMovies(searchQuery);
  //     setMovies(searchResults);
  //     setError(null);
  //   } catch (err) {
  //     console.log(err);
  //     setError("Failed to load movies");
  //   }
  // };

  return (
    <div
      className={` ${theme} flex flex-col justify-center items-center h-full`}
    >
      {/* <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-md py-[0.5rem] px-[1rem] outline-none"
        />
        <button>Search</button>
      </form> */}
      {loading ? (
        <div className="flex justify-center items-center flex-col min-h-screen">
          <Lottie
            animationData={loadingAnimation}
            style={{ width: "200px", height: "200px" }}
          />
          <h1 className={` ${theme}`}>Loading Movies...</h1>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center flex-col min-h-screen gap-4">
          <Lottie
            animationData={errorAnimation}
            style={{ width: "100px", height: "100px" }}
          />
          <h1 className={`text-2xl ${theme}`}>
            Couldn't connect to our servers ⚠
          </h1>
        </div>
      ) : (
        <div className=" h-[90vh] w-full grid gap-12  md:grid-cols-3 lg:grid-cols-3 p-4">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
