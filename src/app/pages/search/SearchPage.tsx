import type { MovieType } from "../../types/movie";
import MovieCard from "../../components/movie/MovieCard";

import BackButton from "../../components/ui/BackButton";
import { useSearch } from "../../hooks/search/useSearch";
import MovieCardSkeleton from "../../components/movie/DummyCard";
import { NoResults } from "../error/empty-search";

const SearchPage = () => {
  const { searchError, searchLoading, searchresults } = useSearch();

  return (
    <div
      className="w-full p-10 flex flex-col
    "
    >
      <span>
        <BackButton />
      </span>
      {searchLoading ? (
        <div className="h-full w-full grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-3 justify-center items-center md:px-10 p-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      ) : searchError ? (
        <NoResults />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
          {searchresults.length === 0 ? (
            <NoResults />
          ) : (
            searchresults.map((searchresult: MovieType) => (
              <MovieCard movie={searchresult} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
