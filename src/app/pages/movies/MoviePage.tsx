import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Heart, Loader2 } from "lucide-react";

import {
  PlayIcon,
  StarIcon,
  CalendarIcon,
  ThumbsUpIcon,
  ClockIcon,
} from "@phosphor-icons/react";

import { Chip, IconButton, Tooltip } from "@material-tailwind/react";
import { motion } from "framer-motion";

import Recommendations from "@/app/components/movie/movies-pages/recommendations";
import Genres from "@/app/components/movie/movies-pages/genre";
import Cast from "@/app/components/movie/movies-pages/cast";
import TrailerModal from "@/app/components/movie/movies-pages/trailer";
import BackButton from "@/app/components/ui/BackButton";
import { useMovieDetails } from "@/app/hooks/movies/useMovieDetails";
import MoviePageSkeleton from "@/app/components/movie/MoviePageSkeleton";
import { useFavourites } from "@/app/hooks/favourites/useFavourites";
import { useUser } from "@/app/hooks/user/useUser";
import { useAddFavourites } from "@/app/hooks/favourites/useAddFavourites";
import { useRemoveFavourite } from "@/app/hooks/favourites/useRemoveFavourite";
import ErrorPage from "@/app/components/ui/ErrorPage";
import LoginPopup from "@/app/components/LoginPopup";
import CustomBtn from "@/app/components/ui/CustomBtn";

const MoviePage = () => {
  const { id } = useParams();
  const movieId = Number(id);
  const { fetchedUser, userLoading } = useUser();

  const {
    movieLoading,
    movieError,
    movie,
    casts,
    castsLoading,
    noCast,
    recError,
    recLoading,
    recommendations,
    trailers,
    refetch,
    trailerLoading,
  } = useMovieDetails({ id: movieId });

  const [openLogin, setOpenLogin] = useState(false);
  const { isFavourite, checking } = useFavourites({ id: movieId });
  const { handleAdd, isPending } = useAddFavourites({ id: movieId });
  const { handleRemove, removingFavourite } = useRemoveFavourite({
    id: movieId,
  });

  const handleFavouriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!fetchedUser && !userLoading) {
      setOpenLogin(!openLogin);
      return;
    }
    if (!movie) return;
    isFavourite ? handleRemove(movie.id) : handleAdd(movie);
  };

  const [trailerOpen, setTrailerOpen] = useState(false);

  useEffect(() => {
    if (movie) document.title = `${movie.title}`;
  }, [movie]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!movieId || isNaN(movieId)) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-4xl">Invalid movie ID</p>
      </div>
    );
  }

  if (movieLoading) return <MoviePageSkeleton />;
  if (movieError) return <ErrorPage onRetry={() => refetch()} />;
  if (!movie) return null;

  const formattedDate = movie?.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const runtime = movie?.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null;

  return (
    <div className="">
      {openLogin && <LoginPopup context="favourite" />}

      <div className="relative min-h-screen w-full">
        {movie?.backdrop_path && (
          // <div className="absolute inset-x-0 top-0 -z-10 max-h-[90vh] overflow-hidden">
          //   <img
          //     src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          //     alt=""
          //     className="h-full w-full scale-110 object-cover blur-[2px] opacity-70"
          //   />
          //   <div className="absolute inset-0 bg-black/65" />
          //   <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-transparent" />
          // </div>
          <span></span>
        )}

        <div className="w-full px-6 md:px-20  pt-10">
          <BackButton whereTo="back" />

          <motion.div
            className="flex flex-col md:flex-row gap-10"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Poster */}
            <div className="w-40 md:w-1/4 mx-auto md:mx-0 shrink-0">
              <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
                {movie?.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="Poster"
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-gray-800 flex items-center justify-center text-sm text-gray-400">
                    No poster available
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col gap-5">
              <h1 className="text-3xl md:text-6xl tracking-wide font-bold  leading-tight">
                {movie?.title || movie?.name}
              </h1>

              <Genres movie={movie} />

              <div className="flex  gap-3 text-sm">
                <Chip
                  className="flex items-center gap-1.5 px-4 py-1.5"
                  color="secondary"
                  variant="ghost"
                >
                  <StarIcon weight="fill" className="text-yellow-400 w-4 h-4" />
                  <p className="font-medium">
                    {movie?.vote_average?.toFixed(1)}
                  </p>
                </Chip>

                {formattedDate && (
                  <Chip
                    className="flex items-center gap-1.5 px-4 py-1.5"
                    color="secondary"
                    variant="ghost"
                  >
                    <CalendarIcon className="w-4 h-4 text-blue-400" />
                    {formattedDate}
                  </Chip>
                )}

                {runtime && (
                  <Chip
                    className="flex items-center gap-1.5 px-4 py-1.5"
                    color="secondary"
                    variant="ghost"
                  >
                    <ClockIcon className="w-4 h-4" />
                    {runtime}
                  </Chip>
                )}
              </div>
              <p className="text-lg font-medium">{movie?.tagline}</p>

              <p className="leading-relaxed text-base md:text-lg max-w-2xl">
                {movie?.overview}
              </p>

              {/* Action Buttons */}

              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-5 rounded-full p-2">
                  <Tooltip>
                    <Tooltip.Trigger aschild="true">
                      <IconButton variant="ghost" isCircular color="secondary">
                        <ThumbsUpIcon size={30} className="stroke-[1px]" />
                      </IconButton>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <p>Like this movie</p>
                    </Tooltip.Content>
                  </Tooltip>

                  <Tooltip>
                    <Tooltip.Trigger>
                      <IconButton
                        variant="ghost"
                        isCircular
                        color="secondary"
                        onClick={handleFavouriteClick}
                        disabled={isPending || checking || removingFavourite}
                      >
                        {isPending || checking || removingFavourite ? (
                          <Loader2 size={30} className="animate-spin" />
                        ) : (
                          <Heart
                            size={30}
                            className={`transition-all duration-300 stroke-[1px] ${
                              isFavourite
                                ? "text-red-500 fill-red-500 scale-110"
                                : ""
                            }`}
                          />
                        )}
                      </IconButton>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <p>
                        {isFavourite
                          ? "Remove from favourite"
                          : "Add to favourite"}
                      </p>
                    </Tooltip.Content>
                  </Tooltip>
                </div>

                <CustomBtn
                  size="lg"
                  variant="solid"
                  color="primary"
                  // className="rounded-full px-8"
                  onClick={() => setTrailerOpen(!trailerOpen)}
                  icon={PlayIcon}
                >
                  Watch trailer
                </CustomBtn>
              </div>

              <div className="max-w-4xl">
                <Cast
                  casts={casts}
                  castsLoading={castsLoading}
                  noCast={noCast}
                />
              </div>
            </div>
          </motion.div>

          <div className="mt-14 flex flex-col gap-14">
            <Recommendations
              recommendations={recommendations}
              recLoading={recLoading}
              recError={recError}
            />
          </div>

          {/* Production Companies */}
          {movie?.production_companies?.length > 0 && (
            <div className="mt-16 pt-8 border-t border-white/10">
              <p className="text-sm mb-4 uppercase tracking-wider">
                Production
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {movie.production_companies.map(
                  (company: {
                    id: number;
                    logo_path: string;
                    name: string;
                  }) => (
                    <div
                      key={company.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                    >
                      {company.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          className="h-6 w-auto max-w-[70px] object-contain bg-white rounded p-0.5"
                        />
                      ) : (
                        <div className="h-6 w-[70px] bg-white rounded" />
                      )}
                      <p className="text-xs font-medium whitespace-nowrap truncate">
                        {company.name}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {trailerOpen && (
        <TrailerModal
          loading={trailerLoading}
          trailer={trailers}
          trailerOpen={trailerOpen}
          trialerClose={() => setTrailerOpen(false)}
        />
      )}
    </div>
  );
};

export default MoviePage;
