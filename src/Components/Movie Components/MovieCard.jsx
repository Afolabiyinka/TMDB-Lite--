import React from "react";
import MovieModal from "./MovieDescription";
import { useTheme } from "../../Contexts/ThemeContext";

const MovieCard = ({ movie }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme } = useTheme();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`movie-card ${theme} rounded-lg border-2  ${
        theme === "dark" ? "bg-[#252525]" : "bg-white"
      } ${theme === "dark" ? "border-black" : "border-gray-100"}`}
    >
      {/* Movie Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-96 transition-all rounded-lg"
      />

      {/* Movie Info */}
      <div className="flex flex-col justify-center gap-2 p-2 rounded-md items-start">
        <span>
          <h1 className="text-xl font- transition-transform duration-500">
            {movie.title}
          </h1>
          <p className="text-xs">{movie.release_date.split("-")[0]}</p>
        </span>
        <span>
          <button
            className="py-2 rounded-md duration-300 px-8 transition-all bg-gradient-to-r from-red-500 to-yellow-500 hover:px-14"
            onClick={handleOpenModal}
          >
            View
          </button>
          {isOpen && (
            <MovieModal
              isOpen={isOpen}
              onClose={handleCloseModal}
              movie={movie}
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
