import Loader from "../components/Loader";
import Actor from "../components/actor/Actor";
import Lottie from "lottie-react";
import errorAnimation from "../../Assets/ErrorAnimation.json";
import { useActors } from "../hooks/useActors";
import type { ActorType } from "../types/actor";

const TrendingActors = () => {
  const { loading, error, actors } = useActors();

  return (
    <div className="w-screen">
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
        <div className="w-full grid gap-12 md:grid-cols-3 lg:grid-cols-4  mt-2 p-4">
          {actors.map((actor: ActorType, index: number) => (
            <Actor key={index} actor={actor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingActors;
