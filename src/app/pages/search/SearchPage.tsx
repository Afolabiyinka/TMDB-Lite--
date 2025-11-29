import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../../services/Request";
import Loader from "../../components/Loader";
import type { Movie } from "../../libs/types";
import MovieCard from "../../components/movie/MovieCard";
import { useSearch } from "../../hooks/SearchContext";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";

  useEffect(() => {
    if (query?.trim()) {
      setSearchQuery(query);
    }
  }, [query, setSearchQuery]);

  const {
    data: searchresults = [],
    error: searchError,
    isLoading: searchLoading,
  } = useQuery({
    queryKey: ["Searchresults", searchQuery],
    queryFn: () => searchMovies(searchQuery),
    enabled: !!searchQuery.trim(),
  });

  return (
    <div
      className="w-full p-10 flex flex-col
    "
    >
      <Link to={"/"} className="w-full p-3 flex justify-end">
        <Button
          variant="solid"
          isPill
          color="primary"
          className="mb-6  flex items-center gap-2 text-xl rounded-xl hover:-translate-x-2"
        >
          <ArrowLeft
            size={40}
            className="stroke-[1px] hover:group-[]:translate-x-4"
          />
          Back Home
        </Button>{" "}
      </Link>
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
