import React, { useState, useEffect } from "react";
import { ThumbsUp, X, Calendar, Star, Heart } from "lucide-react";
import { useFavourites } from "../../Contexts/MovieContext";
import { toast } from "react-toastify";

const MovieModal = ({ isOpen, movie, onClose }) => {
  const [votes, setVotes] = useState(0);
  const { addToFavourites, removeFromFavourites, isFavourite } =
    useFavourites();

  useEffect(() => {
    setVotes(movie?.vote_count || 0);
  }, [movie]);

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    if (isFavourite(movie?.id)) {
      removeFromFavourites(movie?.id);
      toast.info("Removed from favourites", {
        icon: "🗑️",
        position: "bottom-right",
        className: "bg-gray-800 text-white",
      });
    } else {
      addToFavourites(movie);
      toast.success("Added to favourites", {
        icon: "❤️",
        position: "bottom-right",
        className: "bg-gray-800 text-white",
      });
    }
  };

  const movieInFavorites = movie?.id ? isFavourite(movie.id) : false;

  if (!isOpen || !movie) return null;

  // Format the release date if it exists
  const formattedDate = movie?.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md px-4 transition-all duration-300">
      <div className="relative h-[96vh] w-full md:h-[95vh] max-w-5xl overflow-hidden rounded-xl shadow-2xl flex flex-col md:flex-row animate-fadeIn">
        {/* Poster Section with gradient overlay */}
        <div className="w-full md:w-2/5 h-72 md:h-auto relative overflow-hidden">
          {movie?.poster_path ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={`${movie?.title || movie?.name} Poster`}
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
              No poster available
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="w-full md:w-[60%] flex h-[60%] md:h-fit flex-col p-6 md:p-8  text-gray-100">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors duration-200 p-1 rounded-full hover:bg-gray-800"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
            {movie?.title || movie?.name || "Untitled"}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
            {/* Rating */}
            <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>{movie?.vote_average?.toFixed(1) || "N/A"}</span>
            </div>

            {/* Release Date */}
            {formattedDate && (
              <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
                <Calendar className="w-4 h-4 text-blue-400 mr-1" />
                <span>{formattedDate}</span>
              </div>
            )}
          </div>

          {/* Overview with custom scrollbar */}
          <div className="flex-grow overflow-y-scroll h-fit md:w-full text-gray-300  pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            <p className="leading-relaxed">
              {movie?.overview || "No overview available."}
            </p>
          </div>

          {/* Interaction Buttons */}
          <div className="border-t border-gray-700 pt-4 mt-2">
            <div className="flex items-center justify-between">
              {/* Vote Button */}
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-2 rounded-lg"
                  onClick={() => setVotes((prev) => prev + 1)}
                >
                  <ThumbsUp size={18} className="text-blue-400" />
                  <span className="font-medium">{votes}</span>
                </button>
              </div>

              {/* Favorite Button */}
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  movieInFavorites
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
                onClick={handleFavouriteClick}
              >
                <Heart
                  size={18}
                  className={
                    movieInFavorites
                      ? "fill-white text-white transition-all duration-200"
                      : "text-gray-300"
                  }
                />
                <span className="text-sm">
                  {movieInFavorites ? "Saved" : ""}
                </span>
              </button>
            </div>

            {/* Close Button */}
            <span>
              <button
                onClick={onClose}
                className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
