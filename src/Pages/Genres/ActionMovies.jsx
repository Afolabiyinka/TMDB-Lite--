import { useState, useEffect } from "react";
import MovieCard from "../../Components/Movie Components/MovieCard";
import Lottie from "lottie-react";
import { Spinner } from "@material-tailwind/react";
import errorAnimation from "../../Assets/ErrorAnimation.json";
import { getActionMovies } from "../../Services/GetGenres";

const ActionMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadActionMovies = async () => {
      try {
        setLoading(true);
        const actionMovies = await getActionMovies();
        setMovies(actionMovies);
        setError(null);
      } catch (err) {
        setError("Failed to load movies...");
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    loadActionMovies();
  }, []);

  return (
    <div className={`flex flex-col justify-center items-center h-fit`}>
      {loading ? (
        <div className="flex justify-center items-center gap-4 flex-col min-h-screen">
          <Spinner className="h-16 w-16" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center flex-col min-h-screen gap-4">
          <Lottie
            animationData={errorAnimation}
            style={{ width: "100px", height: "100px" }}
          />
          <h1 className={`text-2xl`}>{error}</h1>
        </div>
      ) : (
        <div className="w-full flex flex-col ">
          <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-3 px-1 py-3">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionMovies;
