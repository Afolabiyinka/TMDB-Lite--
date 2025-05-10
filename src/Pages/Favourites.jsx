import React, { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import { motion } from "framer-motion";

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  useEffect(() => {
    const getFavourites = () => {
      try {
        setLoading(true);
      } catch (err) {
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    getFavourites();
  }, []);

  return (
    <div className={`h-[90vh] text-center flex justify-center items-center`}>
      {loading ? (
        <div className="flex justify-center items-center gap-4  flex-col min-h-screen">
          <Spinner className="h-16 w-16" />
          <p>Loading Favourites..</p>
        </div>
      ) : (
        <div
          className={`px-[4rem]  h-[50%] py-[2rem] rounded-md  bg-[rgba(255, 255, 255, 0.05)] flex justify-center items-center flex-col text-center border-gray-400`}
        >
          <motion.h1
            className="text-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {" "}
            You have no favourites
          </motion.h1>
          <p>
            Start adding movies to your favorites and they will appear here!
          </p>
        </div>
      )}
    </div>
  );
};

export default Favourites;
