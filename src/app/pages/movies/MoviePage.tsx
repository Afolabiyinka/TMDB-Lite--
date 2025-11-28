import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThumbsUp, Calendar, Star, Heart, ArrowLeft, Play } from "lucide-react";
import errorAnimation from "../../../Assets/ErrorAnimation.json";
import { toast } from "react-toastify";
import { useFavourites } from "../../hooks/useFavourites";
import {
  getMovieDetails,
  getParticularRecomendations,
  getMovieTrailer,
  getMovieCredits,
} from "../../services/Request";
import { useQuery } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { Button, Chip, IconButton } from "@material-tailwind/react";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";

//Importing the sub pages
import Recommendations from "../../components/movie/movies-pages/recommendations";
import Genres from "../../components/movie/movies-pages/genre";
import Cast from "../../components/movie/movies-pages/cast";

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

  const { data: trailer, error: noTrailer } = useQuery({
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
      <div className="flex justify-center items-center flex-col gap-4">
        <Lottie
          animationData={errorAnimation}
          style={{ width: "100px", height: "100px" }}
        />
        <h1 className={`text-2xl`}>{movieError.message}</h1>
      </div>
    );

  const toastStyle = {
    closeButton: false,
    style: {
      background: "black",
      backdropFilter: "blur(10px)",
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
    <motion.div
      className="w-full h-full  p-6 md:p-10"
      initial={{ y: 100 }}
      animate={{ y: 1 }}
      transition={{ duration: 0.2 }}
    >
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
          <h1 className="text-3xl md:text-5xl tracking-wide font-bold">
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
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 justify-center mt-4 w-full p-1">
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
            <Button
              isPill
              size="xl"
              color="secondary"
              onClick={() => setTrailerOpen(!trailerOpen)}
            >
              <Play className="mr-2 h-4 w-4 stroke-2" />
              Watch Trailer
            </Button>
          </div>

          {trailerOpen && trailer && (
            <div className="w-full h-[500px] md:h-[600px] border">
              <iframe
                className="w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* //Getting the casts and shii */}

          <Cast casts={casts} castsLoading={castsLoading} noCast={noCast} />

          <Recommendations
            recommendations={recommendations}
            recLoading={recLoading}
            recError={recError}
          />

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
        </div>
      </div>
    </motion.div>
  );
};

export default MoviePage;
