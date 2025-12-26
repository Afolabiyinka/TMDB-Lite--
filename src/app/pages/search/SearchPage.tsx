import Loader from "../../components/Loader";
import type { Movie } from "../../libs/types";
import MovieCard from "../../components/movie/MovieCard";

import { useSearch } from "../../hooks/useSearch";
import BackButton from "../../components/BackButton";

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
        <div className=" w-screen h-screen flex flex-col justify-center items-center">
          <Loader />
        </div>
      ) : searchError ? (
        <div>Error</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 w-full">
          {searchresults.length === 0 ? (
            <div className="w-screen h-screen flex flex-col justify-center items-center">
              <h1 className="text-6xl tracking-widest">No results found!</h1>{" "}
            </div>
          ) : (
            searchresults.map((searchresult: Movie) => (
              <MovieCard movie={searchresult} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
