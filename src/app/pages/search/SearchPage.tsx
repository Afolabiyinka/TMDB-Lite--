import type { MovieType } from "../../types/movie.types";
import MovieCard from "../../components/movie/MovieCard";
import BackButton from "../../components/ui/BackButton";
import { useSearch } from "../../hooks/search/useSearch";
import MovieCardSkeleton from "../../components/movie/DummyCard";
import { NoResults } from "../error/empty-search";
import CustomInput from "@/app/components/ui/custom-input";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import ErrorPage from "@/app/components/ui/ErrorPage";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/app/libs/motion-variants";

const SearchPage = () => {
  const {
    searchError,
    searchLoading,
    searchresults,
    query,
    setQuery,
    refetch,
  } = useSearch();

  return (
    <div className="w-full min-h-screen p-6 flex flex-col items-center">
      <span className="w-full flex justify-start p-3 flex-col max-w-xl">
        <div>
          <BackButton whereTo="home" />
        </div>
        <div>
          <CustomInput
            placeholder="Search here..."
            icon={<MagnifyingGlassIcon size={20} />}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e);
            }}
            searchClear={() => setQuery("")}
          />
        </div>
      </span>
      {searchLoading ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="h-full w-full grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-3 justify-center items-center md:px-10 p-4"
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <motion.div key={index} variants={itemVariants}>
              <MovieCardSkeleton key={index} />
            </motion.div>
          ))}
        </motion.div>
      ) : searchError ? (
        <ErrorPage onRetry={() => refetch()} />
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full justify-center items-center"
        >
          {searchresults?.length === 0 ? (
            <NoResults />
          ) : (
            searchresults?.map((searchresult: MovieType, i) => (
              <motion.div key={i} variants={itemVariants}>
                <MovieCard movie={searchresult} />
              </motion.div>
            ))
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SearchPage;
