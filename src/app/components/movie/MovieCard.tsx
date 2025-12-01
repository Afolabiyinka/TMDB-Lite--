import {
  Card,
  Typography,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@material-tailwind/react";
import { Heart } from "lucide-react";
import { useFavourites } from "../../hooks/useFavourites";
import { toast } from "react-toastify";
import { type Movie } from "../../libs/types";

import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const { addToFavourites, removeFromFavourites, isFavourite } =
    useFavourites();

  const handleFavouriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!movie) return;

    const toastStyle = {
      closeButton: false,
      style: {
        background: "black",
        backdropFilter: "blur(10rem)",
        borderRadius: "50px",
        color: "white",
        marginTop: "10px",
      },
    };

    if (isFavourite(movie.id)) {
      removeFromFavourites(movie.id);
      toast.info("Removed from favourites", toastStyle);
    } else {
      addToFavourites(movie);
      toast.success("Added to favourites", toastStyle);
    }
  };

  const movieInFavorites = movie?.id ? isFavourite(movie.id) : false;

  return (
    <>
      <Card
        className="overflow-hidden relative shadow-lg rounded-3xl bg-inherit cursor-pointer hover:scale-[1.02] transition-transform duration-300"
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        <span className="absolute top-2 right-2 z-50">
          <Tooltip placement="top-end">
            <TooltipTrigger>
              <button
                className={`hover:border  rounded-full w-16 flex justify-center items-center h-16 backdrop-blur-2xl shadow-md`}
                onClick={handleFavouriteClick}
              >
                <Heart
                  size={40}
                  className={
                    movieInFavorites
                      ? "fill-red-500 text-red-500 transition-all duration-200"
                      : ""
                  }
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {movieInFavorites
                  ? "Remove from favourite"
                  : "Add to favourite"}
              </p>
            </TooltipContent>
          </Tooltip>
        </span>
        {/* Image Section */}
        <div className="h-[21rem] overflow-hidden w-full">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title || "Movie poster"}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <Typography
                variant="small"
                className="text-gray-500 dark:text-gray-400"
              >
                No image
              </Typography>
            </div>
          )}
        </div>

        {/* Text Info */}
        <div className="flex justify-between items-centerx p-2">
          <div className="p-3 text-left flex flex-col items-start">
            <Typography
              variant="h5"
              className="text-gray-800 dark:text-gray-100 text-xl font-medium break-words truncate"
            >
              {movie.title}
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 dark:text-gray-400"
            >
              {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
            </Typography>
          </div>
        </div>
      </Card>
    </>
  );
};

export default MovieCard;
