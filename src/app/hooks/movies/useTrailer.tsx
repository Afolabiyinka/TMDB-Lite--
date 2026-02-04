import { useQuery } from "@tanstack/react-query";
import { getMovieTrailer } from "../../services/Request";

export const useTrailers = ({ id }: { id: number }) => {
  const { data: trailers, error: noTrailer } = useQuery({
    queryKey: ["trailer", id],
    queryFn: () => getMovieTrailer(id),
  });
  return {
    trailers,
    noTrailer,
  };
};
