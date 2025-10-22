import React, { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import MovieModal from "./MovieModal";

interface Movie {
  id?: number | string;
  title?: string;
  poster_path?: string;
  release_date?: string;
  overview?: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <>
      <Card
        className="overflow-hidden shadow-lg rounded-3xl bg-inherit cursor-pointer hover:scale-[1.02] transition-transform duration-300"
        onClick={handleOpenModal}
      >
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
        <div className="p-3 text-left flex flex-col items-start">
          <Typography
            variant="h5"
            className="text-gray-800 dark:text-gray-100 text-xl font-medium break-words"
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
      </Card>

      {/* Modal */}
      {isOpen && (
        <MovieModal isOpen={isOpen} onClose={handleCloseModal} movie={movie} />
      )}
    </>
  );
};

export default MovieCard;
