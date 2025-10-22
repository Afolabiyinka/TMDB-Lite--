import React, { useState, useEffect } from "react";
import { getPopularPeople } from "../Services/API";
import Actor from "../Components/Celebrities Components/Actor";
import Loader from "../Components/Loader";
import Lottie from "lottie-react";
import errorAnimation from "../Assets/ErrorAnimation.json";

const TrendingActors = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPopularActors = async () => {
      setLoading(true);
      try {
        const popularActors = await getPopularPeople();
        setActors(popularActors);
      } catch (err) {
        setError(true);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };
    loadPopularActors();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center gap-4 flex-col min-h-screen">
          <Loader />
          <p>Loading Actors..</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center gap-4 flex-col min-h-screen">
          <Lottie
            animationData={errorAnimation}
            style={{ width: "100px", height: "100px" }}
          />
          <p className="text-2xl">Error loading actors.</p>
        </div>
      ) : (
        <div className="w-full grid gap-12 md:grid-cols-3 lg:grid-cols-3  mt-2 ">
          {actors.map((actor, index) => (
            <Actor key={index} actor={actor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingActors;
