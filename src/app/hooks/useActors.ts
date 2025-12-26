import { useQuery } from "@tanstack/react-query";
import { getPopularPeople } from "../services/Request";

export const useActors = () => {
  const {
    data: actors,
    isLoading: loading,
    error: error,
  } = useQuery({
    queryKey: ["Actors"],
    queryFn: getPopularPeople,
  });
  return { actors, loading, error };
};
