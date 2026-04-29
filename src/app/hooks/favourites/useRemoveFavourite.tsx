import useToastMessage from "@/app/libs/useToastMsg";
import { removeFromFavourites } from "@/app/services/favouritesRequest";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";

export const useRemoveFavourite = ({ id }: { id: string | number }) => {

    const { toastError, toastSuccess } = useToastMessage();

    //Removing a movie from favourites

    const { mutate: removeMutate, isPending: removingFavourite } = useMutation({
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

    });

    function handleRemove(id: number | string) {
        removeMutate(id);
    }

    return { handleRemove, removingFavourite }
}