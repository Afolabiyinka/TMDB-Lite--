import { motion } from "framer-motion";
import MovieCard from "../../components/movie/MovieCard";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import MovieCardSkeleton from "@/app/components/movie/DummyCard";
import Pagination from "@/app/components/Pagination";
import { useFavourites } from "@/app/hooks/favourites/useFavourites";
import { containerVariants, itemVariants } from "@/app/libs/motion-variants";
import ErrorPage from "@/app/components/ui/ErrorPage";
import { useUser } from "@/app/hooks/user/useUser";
import LoginPopup from "@/app/components/LoginPopup";
import CustomBtn from "@/app/components/ui/CustomBtn";

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
  const { fetchedUser, userLoading } = useUser();

  if (!fetchedUser && !userLoading) {
    return <LoginPopup context="account" />;
  }

  if (isLoading) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-8 w-full max-w-7xl mx-auto pt-10 pb-16 px-4 md:px-10"
      >
        <motion.div
          variants={itemVariants}
          className="bg-gray-200 dark:bg-gray-800 animate-pulse h-9 rounded-full w-56"
        />
        <div className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <motion.div key={index} variants={itemVariants}>
              <MovieCardSkeleton />
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
    <div className="w-full">
      {favourites?.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[75vh] gap-6 text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="rounded-full p-8 bg-red-500/10 dark:bg-red-500/10">
              <Heart
                size={56}
                className="text-red-500 stroke-[1px]"
                fill="currentColor"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
              No Favourites Yet
            </h1>
            <p className="text-sm mt-3 max-w-xs mx-auto text-gray-500 dark:text-gray-400 leading-relaxed">
              Save movies you love. They’ll appear here like your personal
              watchlist.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Link to="/">
              <CustomBtn
                size="xl"
                icon={ArrowLeft}
                className="rounded-full px-8"
              >
                Browse Movies
              </CustomBtn>
            </Link>
          </motion.div>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-7xl mx-auto pt-10 pb-16 px-4 md:px-10"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between mb-8 flex-wrap gap-3"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
                Your Favourites
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {data?.total} {data?.total === 1 ? "movie" : "movies"} saved
              </p>
            </div>
            <Heart size={28} className="text-red-500" fill="currentColor" />
          </motion.div>

          <div className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {favourites.map((movie, i) => (
              <motion.div
                key={movie.id ?? i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Pagination
              currentPage={currentPage}
              handlePrevPage={handlePrevPage}
              maxPages={data?.totalPages}
              handleNextPage={handleNextPage}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Favourites;
