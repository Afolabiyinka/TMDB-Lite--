import Lottie from "lottie-react";
import errorAnimation from "@/Assets/ErrorAnimation.json";
import Pagination from "@/app/components/Pagination";
import MovieCard from "@/app/components/movie/MovieCard";
import useMovies from "@/app/hooks/movies/useMovies";
import type { MovieType } from "@/app/types/movie";
import MovieCardSkeleton from "@/app/components/movie/DummyCard";
import { Button } from "@material-tailwind/react";
import { RefreshCcw } from "lucide-react";

const HomePage = () => {
  const {
    movies,
    isLoading,
    error,
    currentPage,
    handleNextPage,
    handlePrevPage,
    refetch,
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
              style={{ width: "200px", height: "200px" }}
            />
            <h1 className={`text-3xl`}>Something went wrong</h1>
            <Button size="xl" isPill onClick={() => refetch()}>
              <RefreshCcw className="mr-3" />
              Retry
            </Button>
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
