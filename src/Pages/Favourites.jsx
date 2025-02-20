import React, { useState, useEffect } from "react";
import { useTheme } from "../Contexts/ThemeContext";
import Lottie from "lottie-react";
import loadingAnimation from "../Assets/LoadingAnimations.json";
// import MovieCard from "../Components/Movie Components/MovieCard";
// import errorAnimation from "../Assets/ErrorAnimation.json";

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const getFavourites = () => {
      try {
        setLoading(true);
      } catch (err) {
        s;
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };
    getFavourites();
  }, []);

  return (
    <div className={`h-[90vh] ${theme} flex justify-center items-center`}>
      {loading ? (
        <div className="flex justify-center items-center  text-start flex-col min-h-screen">
          <Lottie
            animationData={loadingAnimation}
            style={{ width: "200px", height: "200px" }}
          />
          <p>Loading Favourites..</p>
        </div>
      ) : (
        <div
          className={`px-[4rem]  h-[50%] py-[2rem] rounded-md  bg-[rgba(255, 255, 255, 0.05)] flex justify-center items-center flex-col border-gray-400`}
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
