import React, { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useFavourites } from "../Contexts/MovieContext";
import MovieCard from "../Components/Movie Components/MovieCard";

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  const { favourites } = useFavourites();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[90vh] text-center flex justify-center items-center px-4">
      {loading ? (
        <div className="flex justify-center items-center gap-4 flex-col min-h-screen">
          <Spinner className="h-16 w-16" />
          <p>Loading Favourites...</p>
        </div>
      ) : favourites.length === 0 ? (
        <div className="px-6 py-8 rounded-md bg-[rgba(255,255,255,0.05)] flex justify-center items-center flex-col text-center border border-gray-400">
          <motion.h1
            className="text-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            You have no favourites
          </motion.h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-10">
          {favourites.map((favourite) => (
            <MovieCard key={favourite.id} movie={favourite} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
