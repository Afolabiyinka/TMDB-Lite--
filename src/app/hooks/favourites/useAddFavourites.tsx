import useToastMessage from "@/app/libs/useToastMsg";
import { addToFavourites } from "@/app/services/favouritesRequest";
import type { MovieType } from "@/app/types/movie";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";

export const useAddFavourites = ({ id }: { id: string | number }) => {
    const { toastError, toastSuccess } = useToastMessage();

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

    });
    function handleAdd(movie: MovieType) {
        addMutate(movie);
    }

    return {
        isPending, handleAdd
    }
}