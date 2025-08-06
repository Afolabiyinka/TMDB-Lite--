import { useState } from "react";
import MovieModal from "./MovieDescription";
import { Card, Typography, Button } from "@material-tailwind/react";

export default function MovieCard({ movie }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <Card className="overflow-hidden w-[22rem] md:w-[24rem] shadow-lg bg-gray-50 dark:bg-[#252525]">
      {/* Image Section */}
      <div className="h-80 overflow-hidden">
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

      <div className="p-4 text-left flex flex-col items-start">
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
      <div className="pb-2 pt-0 px-4 w-full">
        <Button
          fullWidth
          // variant="outlined"s

          onClick={handleOpenModal}
          className="rounded-md text-white bg-gradient-to-br from-blue-900 to-blue-500 shadow-none hover:shadow-md transition-colors duration-300 border-none"
        >
          View Details
        </Button>
      </div>

      {/* Modal */}
      {isOpen && (
        <MovieModal isOpen={isOpen} onClose={handleCloseModal} movie={movie} />
      )}
    </Card>
  );
}
