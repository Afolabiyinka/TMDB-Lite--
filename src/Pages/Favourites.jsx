import React, { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
// import MovieCard from "../Components/Movie Components/MovieCard";
// import errorAnimation from "../Assets/ErrorAnimation.json";

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  useEffect(() => {
    const getFavourites = () => {
      try {
        setLoading(true);
      } catch (err) {
      } finally {
        setTimeout(() => setLoading(false), 2000);
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
          <h1 className="text-2xl"> You have no favourites</h1>
          <p>
            Start adding movies to your favorites and they will appear here!
          </p>
        </div>
      )}
    </div>
  );
};

export default Favourites;
