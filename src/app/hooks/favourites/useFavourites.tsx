import {
  getFavourites,
  inFavourites,
} from "@/app/services/favouritesRequest";
import type { MovieType } from "@/app/types/movie";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const useFavourites = ({ id }: { id?: string | number }) => {

  const location = useLocation()

  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const [favourites, setFavourites] = useState<MovieType[]>([]);


  useEffect(() => {
    const allowedPaths = ["/want-to-watch"];
    if (allowedPaths.includes(location.pathname)) {
      setSearchParams({ page: currentPage.toString() });
    }
  }, [currentPage, location.pathname, setSearchParams]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [currentPage]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["favourites", currentPage],
    queryFn: () => getFavourites(currentPage),
  });


  useEffect(() => {
    try {
      if (data) {
        setFavourites(data.favourites);
      }
    } catch (err) {
      console.log(err);
    }
  }, [data]);


  // Checking if its in favourites
  const { data: favouriteData, isLoading: checking } = useQuery({
    queryKey: ["favourite", id],
    queryFn: () => {
      if (!id) throw new Error("Movie id is required");
      return inFavourites(id);
    }, enabled: !!id,
    retry: false
  });

  const isFavourite = favouriteData?.inFavourites ?? false;

  return { favourites, isLoading, error, isFavourite, currentPage, handleNextPage, handlePrevPage, data, checking };
};
