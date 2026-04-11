import {
  Card,
  Typography,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  Chip,
} from "@material-tailwind/react";
import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { MovieType } from "../../types/movie";
import { useFavourites } from "@/app/hooks/favourites/useFavourites";

const MovieCard = ({ movie }: { movie: MovieType }) => {
  const navigate = useNavigate();

  const { isFavourite, handleAdd, handleRemove } = useFavourites();

  const handleFavouriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!movie) return;

    if (isFavourite(movie.id)) {
      handleRemove(movie.id);
    } else {
      handleAdd(movie);
    }
  };

  const movieInFavorites = movie?.id ? isFavourite(movie.id) : false;

  return (
    <Card
      className="overflow-hidden shadow-none relative border-none hover:border rounded-3xl bg-inherit cursor-pointer hover:scale-[1.02] transition-transform duration-300"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="flex items-center justify-between absolute top-2 w-full p-1 z-30">
        <span>
          <Chip
            className="flex items-center  p-1.5 px-3"
            color="secondary"
            variant="solid"
          >
            <Star className="text-yellow-400 h-4 w-4 stroke-[1px]" />
            <p className="font-bold">{movie?.vote_average?.toFixed(1)}</p>
          </Chip>
        </span>
        <span>
          <Tooltip>
            <TooltipTrigger>
              <button
                className={`hover:border  rounded-full w-12 flex justify-center items-center h-12 backdrop-blur-2xl shadow-md`}
                onClick={handleFavouriteClick}
              >
                <Heart
                  size={30}
                  className={`stroke-[1px] ${
                    movieInFavorites
                      ? "fill-red-500 text-red-500 transition-all duration-200 "
                      : ""
                  }`}
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
      </div>
      <div className="h-[21rem] w-full overflow-hidden">
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

      <div className="flex justify-between items-centerx p-2">
        <div className="p-3 text-left flex flex-col items-start">
          <Typography
            variant="h5"
            className="text-gray-800 dark:text-gray-100 text-xl font-medium break-words truncate font-[Bebas Neue]"
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
  );
};

export default MovieCard;
