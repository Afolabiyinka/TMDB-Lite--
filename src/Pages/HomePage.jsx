import { useState, useEffect } from "react";
import { getLatestMovies } from "../Services/API";
import MovieCard from "../Components/MovieCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTheme } from "../Contexts/ThemeContext";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const loadLatestMovies = async () => {
      try {
        const latestMovies = await getLatestMovies();
        setMovies(latestMovies);
        setLoading(true);
      } catch (err) {
        setError(true);
        console.error(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Adjust the delay duration as needed (2000ms = 2 seconds)
      }
    };
    loadLatestMovies();
  }, []);

  return (
    <div className={`homepage ${theme}`}>
      {loading ? (
        <div className="flex justify-center items-center flex-col min-h-screen">
          <DotLottieReact
            src="https://lottie.host/27577e84-d8de-4288-a090-48bf46d002bc/aREEtT36RE.lottie"
            loop
            autoplay
            style={{ width: "200px", height: "200px" }}
          />
          <h1 className={` ${theme}`}>Loading...</h1>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center flex-col min-h-screen">
          <DotLottieReact
            src="https://lottie.host/7a8bf9e6-3d48-4076-99a9-7ddbfb371d70/0dDxtcZn3L.lottie"
            loop
            autoplay
            style={{ width: "200px", height: "200px" }}
          />
          <h1 className={`text-2xl ${theme}`}>No Movies Found</h1>
        </div>
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
