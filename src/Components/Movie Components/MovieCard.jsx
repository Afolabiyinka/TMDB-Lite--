import { useState } from "react";
import MovieModal from "./MovieDescription";
import { Card, Typography, Button, IconButton } from "@material-tailwind/react";
import { Heart } from "lucide-react";
import { useFavourites } from "../../Contexts/MovieContext";

export default function MovieCard({ movie }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const { isFavourite, removeFromFavourites, addToFavourites } =
    useFavourites();

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    if (isFavourite(movie?.id)) {
      removeFromFavourites(movie?.id);
    } else {
      addToFavourites(movie);
    }
  };

  return (
    <Card className="overflow-hidden w-[22rem] md:w-[24rem] shadow-lg bg-gray-50 p-1 dark:bg-gray-900">
      {/* Image Section */}
      <div className="h-80 overflow-hidden">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title || "Movie poster"}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 rounded-md"
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

      <div className="p-2 text-left flex flex-col items-start">
        <Typography
          variant="h5"
          className="text-gray-800 dark:text-gray-100 text-xl font-medium truncate"
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

      {/* Button */}
      <div className="p-2 w-full flex justify-between">
        <Button
          onClick={handleOpenModal}
          className="rounded-xl px-8 border-none font-medium text-white bg-blue-600 shadow-md hover:shadow-lg transition-colors duration-300"
        >
          View Details
        </Button>
        <IconButton
          variant="outline"
          color="secondary"
          onClick={handleFavouriteClick}
          className={`${isFavourite(movie.id) ? "bg-white" : "bg-gray-200"}  p-2  rounded-xl`}
        >
          <Heart fill={`${isFavourite ? "red" : "white"} `} />
        </IconButton>
      </div>

      {/* Modal */}
      {isOpen && (
        <MovieModal isOpen={isOpen} onClose={handleCloseModal} movie={movie} />
      )}
    </Card>
  );
}
