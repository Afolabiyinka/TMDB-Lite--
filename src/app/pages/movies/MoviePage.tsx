import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Heart,
  RefreshCcw,
  Loader2,
} from "lucide-react";

import { PlayIcon, StarIcon, CalendarIcon, ThumbsUpIcon } from "@phosphor-icons/react"
import errorAnimation from "@/Assets/ErrorAnimation.json";

import Lottie from "lottie-react";
import { Button, Chip, IconButton, Tooltip } from "@material-tailwind/react";
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
import { LoginModal } from "@/app/components/LoginModal";
import { useAddFavourites } from "@/app/hooks/favourites/useAddFavourites";
import { useRemoveFavourite } from "@/app/hooks/favourites/useRemoveFavourite";

const MoviePage = () => {
  const { id } = useParams();
  const movieId = Number(id);
  const { fetchedUser, userLoading } = useUser()


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

  //Favourites Stuff

  const [openLogin, setOpenLogin] = useState(false)

  const { isFavourite, checking } = useFavourites({ id: movieId });

  const { handleAdd, isPending } = useAddFavourites({ id: movieId })
  const { handleRemove, removingFavourite } = useRemoveFavourite({ id: movieId })



  const handleFavouriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (!fetchedUser && !userLoading) {
      setOpenLogin(true)
      return
    }
    if (!movie) return;

    if (isFavourite) {
      handleRemove(movie.id);
    } else {
      handleAdd(movie);
    }
  };

  const movieInFavorites = isFavourite

  const [trailerOpen, setTrailerOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!movieId || isNaN(movieId)) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-4xl">Invalid movie ID</p>
      </div>
    );
  }

  if (movieLoading) return <MoviePageSkeleton />;

  if (movieError)
    return (
      <div className="flex justify-center h-screen w-screen items-center flex-col gap-4">
        <Lottie
          animationData={errorAnimation}
          style={{ width: "200px", height: "200px" }}
        />
        <h1 className="text-4xl">{movieError.message} movie details</h1>
        <Button isPill size="xl" onClick={() => refetch()}>
          <RefreshCcw className="h-5 w-6 mr-2" /> Refresh
        </Button>
      </div>
    );

  if (!movie) return null;

  const formattedDate = movie?.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : null;

  return (
    <>
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />

      <motion.div
        className="w-full h-full p-6 md:p-20"
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

            <Genres movie={movie} />

            <div className="flex gap-4 text-sm">
              <Chip
                className="flex items-center p-2 px-4"
                color="secondary"
                variant="ghost"
              >
                <StarIcon className="text-yellow-400 mr-1 stroke-[1px]" />
                <p>{movie?.vote_average?.toFixed(1)}</p>
              </Chip>
              {formattedDate && (
                <Chip
                  className="flex items-center px-6 py-1"
                  color="secondary"
                  variant="ghost"
                >
                  <CalendarIcon className="w-4 h-4 text-blue-400 mr-1" />
                  {formattedDate}
                </Chip>
              )}
            </div>

            <p className="leading-relaxed text-xl">{movie?.overview}</p>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mt-4 w-full p-2">
              <div className="flex items-center gap-3 border rounded-full px-4 w-max">
                <Tooltip>
                  <Tooltip.Trigger>
                    <IconButton
                      variant="ghost"
                      isCircular
                      color="secondary"
                      size="xl"
                    >
                      <ThumbsUpIcon size={40} className="stroke-[1px]" />
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
                      className="flex items-center justify-center w-16 h-16"
                      onClick={handleFavouriteClick}
                      disabled={(isPending || checking || removingFavourite)}
                    >
                      {(isPending || checking || removingFavourite) ? <Loader2 size={40} className="animate-spin" /> : <Heart
                        size={40}
                        className={`transition-all duration-300 stroke-[1px] ${isFavourite
                          ? "text-red-500 fill-red-500 scale-110"
                          : ""
                          }`}
                      />}
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
              </div>

              <Button
                isPill
                size="md"
                variant="solid"
                color="primary"
                className="w-full"
                onClick={() => setTrailerOpen(!trailerOpen)}
              >
                <PlayIcon className="mr-2 h-7 w-7 stroke-[1px]" />
                <p className="text-xl">Watch trailer</p>
              </Button>
            </div>

            <Cast casts={casts} castsLoading={castsLoading} noCast={noCast} />
            <Recommendations
              recommendations={recommendations}
              recLoading={recLoading}
              recError={recError}
            />
          </div>
        </div>

        {/* Production Companies */}
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 p-6 mt-8">
          {movie?.production_companies.map(
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
            ),
          )}
        </div>
      </motion.div>

      {trailerOpen && (
        <TrailerModal
          loading={trailerLoading}
          trailer={trailers}
          trailerOpen={trailerOpen}
          trialerClose={() => setTrailerOpen(false)}
        />
      )}
    </>
  );
};

export default MoviePage;
