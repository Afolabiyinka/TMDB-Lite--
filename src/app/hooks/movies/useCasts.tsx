import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../services/Request";

export const useCasts = ({ id }: { id: number }) => {
  const {
    data: casts,
    error: noCast,
    isLoading: castsLoading,
  } = useQuery({
    queryKey: ["casts", id],
    queryFn: () => getMovieCredits(id),
  });
  return {
    casts,
    noCast,
    castsLoading,
  };
};
