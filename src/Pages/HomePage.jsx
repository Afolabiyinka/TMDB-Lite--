import { useState, useEffect } from "react";
import { getLatestMovies } from "../Services/API";
import MovieCard from "../Components/MovieCard";

import { ToastContainer, toast, Bounce } from "react-toastify";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadLatestMovies = async () => {
      try {
        const latestMovies = await getLatestMovies();
        setLoading(true);
        setMovies(latestMovies);
      } catch (err) {
        // setError(
        //   toast.error("Couldn't connect to our servers!", {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: false,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "dark",
        //     transition: Bounce,
        //   })
        // );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadLatestMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <DotLottieReact
          src="https://lottie.host/27577e84-d8de-4288-a090-48bf46d002bc/aREEtT36RE.lottie"
          loop
          autoplay
        />
      ) : (
        <div className="bg-[#0B0C10] min-h-screen w-full grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
