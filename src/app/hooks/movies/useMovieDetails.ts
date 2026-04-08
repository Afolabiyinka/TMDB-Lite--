import { getMovieCredits, getMovieDetails, getMovieTrailer, getParticularRecomendations } from "@/app/services/Request";
import { useQuery } from "@tanstack/react-query";

export const useMovieDetails = ({ id }: { id: number }) => {

  //Fetching the movie details
  const { data, isLoading, error } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id),
  });

  //fetching the casts
  const {
    data: casts,
    error: noCast,
    isLoading: castsLoading,
    refetch
  } = useQuery({
    queryKey: ["casts", id],
    queryFn: () => getMovieCredits(id),
  });

  //Fetching the recommendations

  const {
    data: recommendations = [],
    isLoading: recLoading,
    error: recError,
  } = useQuery({
    queryKey: ["recommendations", id],
    queryFn: () => getParticularRecomendations(id),
  });

  //Fetching the trailer

  const { data: trailers, error: noTrailer } = useQuery({
    queryKey: ["trailer", id],
    queryFn: () => getMovieTrailer(id),
  });

  return {
    movie: data,
    movieLoading: isLoading,
    movieError: error,
    casts,
    noCast,
    castsLoading,
    recommendations,
    recLoading,
    recError,
    trailers,
    noTrailer,
    refetch
  };
};
