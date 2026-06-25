import { motion } from "framer-motion";
import MovieCard from "../../components/movie/MovieCard";
import { Link } from "react-router-dom";
import { Film, Heart } from "lucide-react";
import { Button } from "@material-tailwind/react";
import MovieCardSkeleton from "@/app/components/movie/DummyCard";
import Pagination from "@/app/components/Pagination";
import { useFavourites } from "@/app/hooks/favourites/useFavourites";
import { containerVariants, itemVariants } from "@/app/libs/motion-variants";
import ErrorPage from "@/app/components/ui/ErrorPage";

const Favourites = () => {
  const {
    currentPage,
    error,
    favourites,
    handleNextPage,
    handlePrevPage,
    isLoading,
    data,
    refetchFavourites,
  } = useFavourites({});
  if (isLoading) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center  gap-6 relative overflow-hidden w-full mt-4"
      >
        <motion.h1
          variants={itemVariants}
          className="bg-gray-300 dark:bg-gray-700 animate-pulse h-10 rounded-full md:w-[40%] w-[80%] mx-2"
        ></motion.h1>
        <div className="h-full w-full grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-3 justify-center items-center md:px-10 p-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <motion.div key={index} variants={itemVariants}>
              <MovieCardSkeleton key={index} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error) {
    return <ErrorPage onRetry={() => refetchFavourites()} />;
  }
  return (
    <div className="text-center flex justify-center items-center w-full">
      {favourites?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen gap-6 relative overflow-hidden w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="rounded-full flex items-center justify-center relative overflow-hidden p-10">
              {/* Icon */}
              <Heart
                size={64}
                className="text-red-500 stroke-[1px]"
                fill="red"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center z-10"
          >
            <h1 className="text-4xl font-bold tracking-wide">
              No Favourites Yet
            </h1>
            <p className="text-sm  mt-2 max-w-xs">
              Save movies you love. They’ll appear here like your personal
              watchlist.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="z-10"
          >
            <Link to="/">
              <Button size="xl" isPill>
                <Film size={18} className="mr-2" />
                Browse Movies
              </Button>
            </Link>
          </motion.div>
        </div>
      ) : (
        <motion.div className="py-3 flex flex-col items-center  h-full w-screen p-2 md:p-10">
          <motion.h1 variants={itemVariants} className="text-4xl mb-3">
            {data?.total} Movies added to Favourites
          </motion.h1>

          <div className="w-full flex flex-col">
            <motion.div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-3 justify-center p-3 md:px-8 items-center">
              {favourites.map((movie, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <MovieCard movie={movie} key={movie.id} />
                </motion.div>
              ))}
            </motion.div>
          </div>
          <Pagination
            currentPage={currentPage}
            handlePrevPage={handlePrevPage}
            maxPages={data?.totalPages}
            handleNextPage={handleNextPage}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Favourites;
