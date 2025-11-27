import Lottie from "lottie-react";
import errorAnimation from "../../../Assets/ErrorAnimation.json";
import Pagination from "../../components/Pagination";
import Loader from "../../components/Loader";
import MovieCard from "../../components/movie/MovieCard";
import useMovies from "../../hooks/useMovies";
import GenreNav from "../Genres/GenreNavigation";

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
    <div>
      <GenreNav />
      <div className={`flex flex-col justify-center items-center h-fit`}>
        {isLoading ? (
          <div className="flex justify-center items-center gap-4 flex-col min-h-screen">
            <Loader />
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
          <div className="w-full flex flex-col px-8 ">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 py-3 justify-center items-center">
              {movies.map((movie: any) => (
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
