import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThumbsUp, X, Calendar, Star, Heart, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useFavourites } from "../../hooks/useFavourites";
import useHomePage from "../../hooks/useHomePage";
import { getMovieReviews } from "../../services/Request";

const MoviePage = () => {
  const [votes, setVotes] = useState(0);
  const [reviews, setReviws] = useState([]);
  const [fectchedInfo, setFetchedInfo] = useState<any>([]);
  const { addToFavourites, removeFromFavourites, isFavourite, favourites } =
    useFavourites();

  const { id } = useParams();
  const navigate = useNavigate();
  const { movies } = useHomePage();

  useEffect(() => {
    async function getReviews(id: any) {
      try {
        const reviewsData = await getMovieReviews(id);
        setReviws(reviewsData);
      } catch (err) {
        console.log(err);
      }
    }
    getReviews(id);
  }, [id]);

  const movie: any = movies.find((u) => u.id === Number(id));

  useEffect(() => {
    setVotes(movie?.vote_count || 0);
  }, []);

  if (!movie) return null;

  const toastStyle = {
    closeButton: false,
    style: {
      background: "black",
      backdropFilter: "blur(10rem)",
      borderRadius: "50px",
      padding: "20px",
      color: "white",
      marginTop: "10px",
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
    <div className="w-full  p-6 md:p-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 w-full p-2  flex items-center gap-2 text-xl rounded-xl hover:-translate-x-2"
      >
        <ArrowLeft
          size={40}
          className="stroke-[1px] hover:group-[]:translate-x-4"
        />
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Poster */}
        <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-lg">
          {movie?.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="Poster"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full dark:bg-gray-800 flex items-center justify-center">
              No poster available
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            {movie?.title || movie?.name}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center dark:bg-gray-800 rounded-full px-3 py-1">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              {movie?.vote_average?.toFixed(1)}
            </div>

            {formattedDate && (
              <div className="flex items-center dark:bg-gray-800 rounded-full px-3 py-1">
                <Calendar className="w-4 h-4 text-blue-400 mr-1" />
                {formattedDate}
              </div>
            )}
          </div>

          <p className="leading-relaxed text-xl ">{movie?.overview}</p>
          {/* 
          <div>
            {reviews.map((review: any) => (
              <span>
                <span>{review.author}</span>
                <span>{review.author_details.name}</span>
              </span>
            ))}
          </div> */}
          <div className="flex items-center gap-4 mt-4">
            {/* Likes */}
            <button
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
              onClick={() => setVotes((prev) => prev + 1)}
            >
              <ThumbsUp size={18} className="text-blue-400" />
              {votes}
            </button>

            {/* Favourite */}
            <button
              onClick={handleFavouriteClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                movieInFavorites
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "dark:bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <Heart
                size={18}
                className={movieInFavorites ? "fill-red-500 text-red-500" : ""}
              />
              {movieInFavorites ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
