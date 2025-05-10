const MovieCard = ({ movie }) => {
  return (
    <div className="max-w-sm text-white rounded-lg shadow-lg overflow-hidden  bg-gray-800 cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
        alt={movie.title}
        className=" h-64 sm:h-64 md:h-72 lg:h-80 object-fill hover:scale-9 hover:object-fill transition-transform duration-500"
      />

      <div className="p-2">
        <h1 className="text-2xl font-bold flex flex-col underline-offset-1">
          {movie.title}
        </h1>
        <p className="font-sans font-semibold">{movie.release_date}</p>
        <p>{movie.actor}</p>
        <p>{movie.vote_count} votes</p>
        {/* <p>{movie.vote_average}% likes</p> */}
      </div>
    </div>
  );
};

export default MovieCard;
