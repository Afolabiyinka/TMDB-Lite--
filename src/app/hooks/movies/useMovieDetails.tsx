import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../../services/Request";

export const useMovieDetails = ({ id }: { id: number }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id),
  });
  return {
    movie: data,
    loading: isLoading,
    movieError: error,
  };
};
