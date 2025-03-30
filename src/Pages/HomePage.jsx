import { useState, useEffect } from "react";
import { getLatestMovies } from "../Services/API";
import MovieCard from "../Components/Movie Components/MovieCard";
import Lottie from "lottie-react";
import loadingAnimation from "../Assets/LoadingAnimations.json";
import errorAnimation from "../Assets/ErrorAnimation.json";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setLoading(true);
        const popularMovies = await getLatestMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  return (
    <div className={"flex flex-col justify-center items-center h-fit"}>
      {loading ? (
        <div className="flex justify-center items-center flex-col min-h-screen">
          <Lottie
            animationData={loadingAnimation}
            style={{ width: "200px", height: "200px" }}
          />
          <h1 className="">Loading Movies...</h1>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center flex-col min-h-screen gap-4">
          <Lottie
            animationData={errorAnimation}
            style={{ width: "100px", height: "100px" }}
          />
          <h1 className={`text-2xl`}>Couldn't connect to our servers ⚠</h1>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-3 p-4">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
