import useToastMessage from "@/app/libs/useToastMsg";
import {
  addToFavourites,
  getFavourites,
  inFavourites,
  removeFromFavourites,
} from "@/app/services/favouritesRequest";
import type { MovieType } from "@/app/types/movie";
import { queryClient } from "@/main";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFavourites = ({ id }: { id?: string | number }) => {
  const { toastError, toastLoading, toastSuccess } = useToastMessage();

  const { data, isLoading, error } = useQuery({
    queryKey: ["favourites"],
    queryFn: getFavourites,
  });

  // Checking if its in favourites
  const { data: favouriteData } = useQuery({
    queryKey: ["favourite", id],
    queryFn: () => {
      if (!id) throw new Error("Movie id is required");
      return inFavourites(id);
    }, enabled: !!id,
    retry: false
  });

  const isFavourite = favouriteData?.inFavourites ?? false;

  //Adding a movie to favourites
  const { mutate: addMutate, isPending } = useMutation({
    mutationFn: (movie: MovieType) => addToFavourites(movie),
    onSuccess: (data) => {
      toastSuccess(data.message || "Added to favourites");
      queryClient.invalidateQueries({
        queryKey: ["favourites"],
      });
      queryClient.invalidateQueries({
        queryKey: ["favourite", id],
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
      queryClient.invalidateQueries({
        queryKey: ["favourite", id],
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


  return { data, isLoading, error, handleRemove, handleAdd, isPending, isFavourite };
};
