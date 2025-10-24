import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFavourites } from "../../hooks/useFavourites";
import MovieCard from "../../components/movie/MovieCard";
import Loader from "../../components/Loader";

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  const { favourites } = useFavourites();

  return (
    <div className=" text-center flex justify-center items-center w-full">
      {loading ? (
        <div className="flex justify-center items-center gap-4 flex-col min-h-screen">
          <Loader />
          <p>Loading Favourites...</p>
        </div>
      ) : favourites.length === 0 ? (
        <div className="px-6 py-8 rounded-md flex justify-center  items-center flex-col text-center h-screen">
          <motion.h1
            className="text-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            You have no favourites!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Start Adding Movies to your favourites and they'll appear here
          </motion.p>
        </div>
      ) : (
        <div className="py-3 flex flex-col items-center  h-full w-screen">
          <h1 className="text-4xl mb-3">Your Favourites</h1>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
            {favourites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourites;
