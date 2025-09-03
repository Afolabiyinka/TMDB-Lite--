import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFavourites } from "../Contexts/MovieContext";
import MovieCard from "../Components/Movie Components/MovieCard";
import Loader from "../Components/Loader";

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  const { favourites } = useFavourites();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="min-h-[90vh] text-center flex justify-center items-center w-full">
      {loading ? (
        <div className="flex justify-center items-center gap-4 flex-col min-h-screen">
          <Loader />
          <p>Loading Favourites...</p>
        </div>
      ) : favourites.length === 0 ? (
        <div className="px-6 py-8 rounded-md flex justify-center items-center flex-col text-center">
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
        <div className="py-3">
          <h1 className="text-4xl mb-3">Your Favourites</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-1">
            {favourites.map((favourite) => (
              <MovieCard key={favourite.id} movie={favourite} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourites;
