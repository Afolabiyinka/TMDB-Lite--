import { useParams, useNavigate } from "react-router-dom";
import { ThumbsUp, Calendar, Star, Heart, ArrowLeft, Play } from "lucide-react";
import errorAnimation from "../../../Assets/ErrorAnimation.json";
import { toast } from "react-toastify";
import { useFavourites } from "../../hooks/useFavourites";
import {
  getMovieDetails,
  getParticularRecomendations,
} from "../../services/Request";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { Button, Chip, IconButton } from "@material-tailwind/react";
import MovieCard from "./MovieCard";
import Loader from "../Loader";

const MoviePage = () => {
  const { addToFavourites, removeFromFavourites, isFavourite } =
    useFavourites();

  const { id } = useParams();
  const navigate = useNavigate();
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
  //Movie Reviews

  if (movieLoading) return <Loader />;

  if (movieError)
    return (
      <div className="flex justify-center items-center flex-col gap-4">
        <Lottie
          animationData={errorAnimation}
          style={{ width: "100px", height: "100px" }}
        />
        <h1 className={`text-2xl`}>{movieError.message}</h1>
      </div>
    );

  if (!movie) return <div>No movie found</div>;

  const toastStyle = {
    closeButton: false,
    style: {
      background: "black",
      backdropFilter: "blur(10rem)",
      Radius: "50px",
      padding: "20px",
      color: "white",
      marginTop: "10px",
      borderRadius: "40px",
    },
  };

  const handleFavouriteClick = () => {
    if (isFavourite(movie.id)) {
      removeFromFavourites(movie.id);
      toast.info("Removed from favourites", toastStyle);
    } else {
      addToFavourites(movie);
      toast.success("Added to favourites", toastStyle);
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
    <div className="w-full h-full  p-6 md:p-10">
      <Button
        variant="solid"
        isPill
        color="primary"
        onClick={() => navigate(-1)}
        className="mb-6  border  flex items-center gap-2 text-xl rounded-xl hover:-translate-x-2"
      >
        <ArrowLeft
          size={40}
          className="stroke-[1px] hover:group-[]:translate-x-4"
        />
        Back
      </Button>

      <div className="flex flex-col md:flex-row gap-10 min-h-screen">
        {/* Poster */}
        <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-lg">
          {movie?.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="Poster"
              className="w-full object-cover"
            />
          ) : (
            <div className="w-full h-full dark:bg-gray-800 flex items-center justify-center">
              No poster available
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-6 w-full lg:w-1/2">
          <h1 className="text-3xl md:text-5xl tracking-wide font-bold">
            {movie?.title || movie?.name}
          </h1>

          {/* the movie genre */}
          <div className="w-full">
            <span className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {movie.genres.map((genre: { name: string; id: number }) => (
                <Chip
                  variant="outline"
                  key={genre.id}
                  color="secondary"
                  className="flex items-center justify-center gap-1 w-full py-2.5 sm:w-auto"
                >
                  {genre.name}
                </Chip>
              ))}
            </span>
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 justify-center mt-4    ">
            {/* Likes Button*/}
            <span className="flex gap-3 w-full">
              <IconButton
                className="flex items-center justify-center gap-2 p-2"
                isCircular
                size="xl"
                color="secondary"
                variant="outline"
              >
                <ThumbsUp size={25} className="text-blue-400" />
              </IconButton>
              {/* Favourite */}
              <Button
                isPill
                size="xl"
                color="secondary"
                variant={`${movieInFavorites ? "gradient" : "outline"}`}
                onClick={handleFavouriteClick}
                className={`flex items-center gap-2`}
              >
                <Heart
                  size={18}
                  className={
                    movieInFavorites ? "fill-red-500 text-red-500" : ""
                  }
                />
                <p className="font-bold">
                  {movieInFavorites
                    ? "Saved to favourites"
                    : "Save to favourites"}
                </p>
              </Button>
            </span>
            <Button isPill size="xl" color="secondary">
              <Play className="mr-2 h-4 w-4 stroke-2" />
              Watch Trailer
            </Button>
          </div>
          <div>
            {recLoading ? (
              <Loader />
            ) : recError ? (
              <div>{recError.message}</div>
            ) : (
              <div>
                <h3 className="text-3xl tracking-wide">More like this</h3>

                <span className="flex w-full gap-5 h-[26rem] overflow-x-auto p-6">
                  {(recommendations?.results ?? [])
                    .slice(0, 10)
                    .map((rec: any) => (
                      <div key={rec.id} className="flex-shrink-0 w-64">
                        <MovieCard movie={rec} />
                      </div>
                    ))}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
