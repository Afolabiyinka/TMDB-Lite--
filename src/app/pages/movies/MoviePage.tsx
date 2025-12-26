import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThumbsUp, Calendar, Star, Heart, Play } from "lucide-react";
import errorAnimation from "../../../Assets/ErrorAnimation.json";
import { toast } from "sonner";
import {
  getMovieDetails,
  getParticularRecomendations,
  getMovieTrailer,
  getMovieCredits,
} from "../../services/Request";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { Button, Chip, IconButton, Tooltip } from "@material-tailwind/react";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";

//Importing the sub pages
import Recommendations from "../../components/movie/movies-pages/recommendations";
import Genres from "../../components/movie/movies-pages/genre";
import Cast from "../../components/movie/movies-pages/cast";
import TrailerModal from "../../components/movie/movies-pages/trailer";
import BackButton from "../../components/BackButton";
import { useFavouritesStore } from "../../store/favouritesStore";

const MoviePage = () => {
  const { addToFavourites, removeFromFavourites, isFavourite } =
    useFavouritesStore();

  const { id } = useParams();

  // Movie details
  const {
    data: movie,
    isLoading: movieLoading,
    error: movieError,
  } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id),
  });

  // Movie recommendations
  const {
    data: recommendations,
    isLoading: recLoading,
    error: recError,
  } = useQuery({
    queryKey: ["recommendations", id],
    queryFn: () => getParticularRecomendations(id),
  });

  const { data: trailers, error: noTrailer } = useQuery({
    queryKey: ["trailer", id],
    queryFn: () => getMovieTrailer(id),
  });
  const {
    data: casts,
    error: noCast,
    isLoading: castsLoading,
  } = useQuery({
    queryKey: ["casts", id],
    queryFn: () => getMovieCredits(id),
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const [trailerOpen, setTrailerOpen] = useState(false);

  if (movieLoading)
    return (
      <div className="h-screen w-screen">
        <Loader />
      </div>
    );

  if (movieError)
    return (
      <div className="flex justify-center h-screen w-screen items-center flex-col gap-4">
        <Lottie
          animationData={errorAnimation}
          style={{ width: "100px", height: "100px" }}
        />
        <h1 className={`text-2xl`}>{movieError.message} movie details</h1>
      </div>
    );

  const handleFavouriteClick = () => {
    if (isFavourite(movie.id)) {
      removeFromFavourites(movie.id);
      toast.info("Removed from your favourites");
    } else {
      addToFavourites(movie);
      toast.success("Added to your favourites");
    }
  };

  const movieInFavorites = movie?.id ? isFavourite(movie.id) : false;

  const formattedDate = movie?.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <motion.div
        className="w-full h-full  p-6 md:p-10"
        initial={{ y: 100 }}
        animate={{ y: 1 }}
        transition={{ duration: 0.6 }}
      >
        <BackButton />

        <div className="flex flex-col md:flex-row gap-10 min-h-screen">
          {/* Poster */}
          <div className="w-full md:w-1/3 rounded-xl overflow-hidden">
            {movie?.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="Poster"
                className="w-full object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full dark:bg-gray-800 flex items-center justify-center">
                No poster available
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col gap-6 w-full lg:w-1/2">
            <h1 className="text-3xl md:text-5xl tracking-wider font-bold font-[Bebas Neue]">
              {movie?.title || movie?.name}
            </h1>

            {/* the movie genre */}
            <Genres movie={movie} />
            <div className="flex  gap-4 text-sm">
              <Chip
                className="flex items-center  p-2 px-4"
                color="secondary"
                variant="ghost"
              >
                <Star className="text-yellow-400 mr-1 stroke-[1px]" />
                <p> {movie?.vote_average?.toFixed(1)}</p>
              </Chip>

              {formattedDate && (
                <Chip
                  className="flex items-center px-6 py-1"
                  color="secondary"
                  variant="ghost"
                >
                  <Calendar className="w-4 h-4 text-blue-400 mr-1" />
                  {formattedDate}
                </Chip>
              )}
            </div>

            <p className="leading-relaxed text-xl ">{movie?.overview}</p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4 mt-4 w-full p-2">
              {/* Likes Button */}
              <Tooltip>
                <Tooltip.Trigger>
                  <IconButton
                    variant="ghost"
                    isCircular
                    color="secondary"
                    size="xl"
                  >
                    <ThumbsUp size={40} className="" />
                  </IconButton>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>Like this movie</p>
                </Tooltip.Content>
              </Tooltip>

              {/* Favourite */}
              <Tooltip>
                <Tooltip.Trigger>
                  <IconButton
                    variant="outline"
                    isCircular
                    color="secondary"
                    size="xl"
                    className="flex items-center justify-center w-16 h-16"
                    onClick={handleFavouriteClick}
                  >
                    <Heart
                      size={40}
                      className={`transition-all duration-300 ${
                        movieInFavorites
                          ? "text-red-500 fill-red-500 scale-110"
                          : "text-gray-300"
                      }`}
                    />
                  </IconButton>
                </Tooltip.Trigger>
                <Tooltip.Content>
                  <p>
                    {movieInFavorites
                      ? "Remove from favourite"
                      : "Add to favourite"}
                  </p>
                </Tooltip.Content>
              </Tooltip>

              {/* Trailer Button */}
              <Button
                isPill
                size="xl"
                variant="solid"
                color="secondary"
                className="w-full"
                onClick={() => setTrailerOpen(!trailerOpen)}
              >
                <Play className="mr-2 h-7 w-7 stroke-2" />
                <p className="text-xl"> Watch Trailer</p>
              </Button>
            </div>

            {/* //Getting the casts */}
            <Cast casts={casts} castsLoading={castsLoading} noCast={noCast} />

            <Recommendations
              recommendations={recommendations}
              recLoading={recLoading}
              recError={recError}
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 p-6 mt-8">
          {movie.production_companies.map(
            (company: { id: number; logo_path: string; name: string }) => (
              <div
                key={company.id}
                className="flex items-center gap-3 p-4 w-full border-none"
              >
                {company.logo_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    className="h-6 w-auto max-w-[80px] object-contain bg-white rounded"
                  />
                ) : (
                  <div className="h-6 w-[80px] bg-white rounded" />
                )}

                <p className="text-sm font-medium whitespace-nowrap">
                  {company.name}
                </p>
              </div>
            )
          )}
        </div>
      </motion.div>
      {trailerOpen && (
        <TrailerModal
          trailer={trailers}
          trailerOpen={trailerOpen}
          trialerClose={() => setTrailerOpen(false)}
        />
      )}
    </>
  );
};

export default MoviePage;
