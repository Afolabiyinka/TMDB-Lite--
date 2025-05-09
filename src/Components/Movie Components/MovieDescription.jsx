import React, { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";
import { useFavourites } from "../../Contexts/MovieContext";
import { toast } from "react-toastify";
import { Bookmark } from "lucide-react";

const MovieModal = ({ isOpen, movie, onClose }) => {
  const [votes, setVotes] = useState(0);
  const { addToFavourites, removeFromFavourites, isFavourite } =
    useFavourites();

  useEffect(() => {
    setVotes(movie.vote_count || 0);
  }, [movie]);

  const onFavouriteClick = (e) => {
    e.preventDefault();
    if (isFavourite(movie.id)) {
      removeFromFavourites(movie.id);
      toast.info("Removed from favourites");
    } else {
      addToFavourites(movie);
      toast.success("Added to favourites");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="rounded-lg shadow-xl bg-inherit backdrop-blur-3xl overflow-hidden w-full max-w-4xl flex flex-col sm:flex-row max-h-[97%] md:max-h-[70%]">
        <div className="w-full sm:w-2/5 h-64 sm:h-auto">
          {movie?.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie?.title || "Movie poster"}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex flex-col p-4 sm:p-6 w-full sm:w-3/5 h-full">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            {movie?.title || movie?.name || "Untitled"}
          </h2>

          <div className="flex items-center gap-4 mb-4 text-sm">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 text-yellow-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              {movie?.vote_average}
            </span>
          </div>

          <div className="overflow-y-auto flex-grow mb-4">
            <p>{movie?.release_date}</p>
            <p className="mb-4">{movie?.overview}</p>
          </div>

          <div className="flex gap-2 items-center py-2">
            <ThumbsUp
              className="cursor-pointer text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-110"
              onClick={() => setVotes((prevVotes) => prevVotes + 1)}
            />
            <span className="text-lg font-medium">{votes}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <span>
              <Bookmark
                size={35}
                // className="bg-blue-600 py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                onClick={onFavouriteClick}
              />{" "}
              <p>{isFavourite ? "Add Favourite" : "Remove from favourite"}</p>
            </span>

            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
