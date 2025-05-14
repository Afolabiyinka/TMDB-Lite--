import MovieCard from "../Components/Movie Components/MovieCard";
import Lottie from "lottie-react";
import errorAnimation from "../Assets/ErrorAnimation.json";
import Pagination from "../Components/Pagination";
import GenreNav from "./Genres/GenreNavigation";
import { UseHome } from "../Contexts/HomePageContext";
import Loader from "../Components/Loader";

const HomePage = () => {
  const {
    movies,
    loading,
    error,
    currentPage,
    handleNextPage,
    handlePrevPage,
  } = UseHome();
  return (
    <div className={`flex flex-col justify-center items-center h-fit`}>
      <div>
        <GenreNav />
      </div>
      {loading ? (
        <div className="flex justify-center items-center gap-4 flex-col min-h-screen">
          <Loader />
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
        <div className="w-full flex flex-col  ">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 py-3 justify-center items-center">
            {movies.map((movie) => (
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
  );
};

export default HomePage;
