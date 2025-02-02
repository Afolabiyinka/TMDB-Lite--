import React from "react";
import MovieModal from "./MovieDescription";

const MovieCard = ({ movie }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-[#191919] rounded-md shadow-lg w-full overflow-hidden flex flex-col p-1 gap-1 transition-all duration-300">
      {/* Movie Poster */}
      <img
        src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-72 object-cover rounded-md hover:scale-95 transition-all"
      />

      {/* Movie Info */}
      <div className="flex flex-col justify-center gap-2 p-2 bg-[#191919]] rounded-md text-white items-start">
        <span>
          <h1 className="text-2xl overflow-hidden transition-transform duration-500">
            {movie.title}
            {/* <p>{movie.id}</p> */}
          </h1>
          <p className="text-xs">{movie.release_date.split("-")[0]}</p>
        </span>
        <span>
          <button
            className=" py-2 rounded-md duration-300  px-8 transition-all bg-gradient-to-r from-red-500 to-yellow-500 hover:px-14"
            onClick={handleOpenModal}
          >
            <MovieModal
              isOpen={isOpen}
              movie={movie}
              onClose={handleCloseModal}
            />
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
