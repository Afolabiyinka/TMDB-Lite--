import Pagination from "@/app/components/Pagination";
import MovieCard from "@/app/components/movie/MovieCard";
import useMovies from "@/app/hooks/movies/useMovies";
import type { MovieType } from "@/app/types/movie.types";
import MovieCardSkeleton from "@/app/components/movie/DummyCard";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/app/libs/motion-variants";
import ErrorPage from "@/app/components/ui/ErrorPage";

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
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div
        className={`flex flex-col justify-center items-center h-full  w-full`}
      >
        {isLoading ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-3 justify-center p-3 md:px-8 items-center w-full"
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <motion.div
                className="w-full"
                key={index}
                variants={itemVariants}
              >
                <MovieCardSkeleton key={index} />
              </motion.div>
            ))}
          </motion.div>
        ) : error ? (
          <ErrorPage onRetry={() => refetch()} />
        ) : (
          <motion.div className="w-full flex flex-col justify-center items-center space-y-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-3 justify-center p-3 md:px-8 items-center w-full"
            >
              {movies.map((movie: MovieType, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <MovieCard movie={movie} key={movie.id} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
        {movies && !error && (
          <Pagination
            currentPage={currentPage}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
