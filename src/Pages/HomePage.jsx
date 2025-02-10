import { useState, useEffect } from "react";
import { getLatestMovies } from "../Services/API";
import MovieCard from "../Components/MovieCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTheme } from "../Contexts/ThemeContext";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const loadLatestMovies = async () => {
      try {
        const latestMovies = await getLatestMovies();
        setLoading(true);
        setMovies(latestMovies);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadLatestMovies();
  }, []);

  return (
    <div className={`homepage ${theme}`}>
      {loading ? (
        <DotLottieReact
          src="https://lottie.host/27577e84-d8de-4288-a090-48bf46d002bc/aREEtT36RE.lottie"
          loop
          autoplay
        />
      ) : (
        <div className="min-h-screen w-full grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
