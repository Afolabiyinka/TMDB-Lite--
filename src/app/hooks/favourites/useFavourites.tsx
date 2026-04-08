import useToastMessage from "@/app/libs/useToastMsg";
import {
  addToFavourites,
  getFavourites,
  removeFromFavourites,
} from "@/app/services/favouritesRequest";
import type { MovieType } from "@/app/types/movie";
import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFavourites = () => {
  const { toastError, toastLoading, toastSuccess } = useToastMessage();

  const { data, isLoading, error } = useQuery({
    queryKey: ["favourites"],
    queryFn: getFavourites,
  });

  //Adding a movie to favourites
  const { mutate: addMutate } = useMutation({
    mutationFn: (movie: MovieType) => addToFavourites(movie),
    onSuccess: (data) => {
      toastSuccess(data.message || "Added to favourites");
      queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });
    },
    onError: (data) => {
      toastError(data.message || "Something went wrong");
    },
    onMutate: () => {
      toastLoading("Updating favourites...");
    },
  });

  //Removing a movie from favourites

  const { mutate: removeMutate } = useMutation({
    mutationFn: (id: string | number) => removeFromFavourites(id),
    onSuccess: (data) => {
      toastSuccess(data.message || "Removed from favourites");
      queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });
    },
    onError: (data) => {
      toastError(data.message || "Something went wrong");
    },
    onMutate: () => {
      toastLoading("Updating favourites...");
    },
  });

  function handleAdd(movie: MovieType) {
    addMutate(movie);
  }

  function handleRemove(id: number | string) {
    removeMutate(id);
  }

  const isFavourite = (movieId: number) => {
    return data?.favourites?.some((fav: MovieType) => fav.id === movieId);
  };

  return { data, isLoading, error, isFavourite, handleRemove, handleAdd };
};
