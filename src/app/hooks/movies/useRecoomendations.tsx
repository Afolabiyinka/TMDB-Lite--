import { useQuery } from "@tanstack/react-query";
import { getParticularRecomendations } from "../../services/Request";

export const useReccomendations = ({ id }: { id: number }) => {
  const {
    data: recommendations = [],
    isLoading: recLoading,
    error: recError,
  } = useQuery({
    queryKey: ["recommendations", id],
    queryFn: () => getParticularRecomendations(id),
  });
  return {
    recommendations,
    recLoading,
    recError,
  };
};
