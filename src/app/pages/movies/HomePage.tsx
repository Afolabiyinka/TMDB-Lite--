import Lottie from "lottie-react";
import errorAnimation from "../../../Assets/ErrorAnimation.json";
import Pagination from "../../components/Pagination";
import MovieCard from "../../components/movie/MovieCard";
import useMovies from "../../hooks/movies/useMovies";
import type { MovieType } from "../../types/movie";
import MovieCardSkeleton from "../../components/movie/DummyCard";

const HomePage = () => {
  const {
    movies,
    isLoading,
    error,
    currentPage,
    handleNextPage,
    handlePrevPage,
  } = useMovies();

  return (
    <div className="w-full h-full">
      <div className={`flex flex-col justify-center items-center h-fit`}>
        {isLoading ? (
          <div className="h-full w-full grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-3 justify-center items-center md:px-10 p-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="flex justify-center items-center flex-col min-h-screen gap-4">
            <Lottie
              animationData={errorAnimation}
              style={{ width: "100px", height: "100px" }}
            />
            <h1 className={`text-2xl`}>{error.message}</h1>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-3 justify-center p-3 md:px-8 items-center">
              {movies.map((movie: MovieType) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </div>
    </div>
  );
};

export default HomePage;
