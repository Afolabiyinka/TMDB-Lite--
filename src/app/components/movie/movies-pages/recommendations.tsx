import Loader from "../../Loader";
import MovieCard from "../MovieCard";
import { motion } from "framer-motion";

interface RecommendationsProps {
  recommendations: [];
  recLoading: boolean;
  recError: any;
}

const Recommendations = ({
  recommendations,
  recLoading,
  recError,
}: RecommendationsProps) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0.7 }}
      animate={{ x: 1, opacity: 1 }}
      // viewport={{ amount: 0.5 }}
      transition={{ duration: 1 }}
    >
      {recLoading ? (
        <div className="h-full w-full">
          <Loader />
        </div>
      ) : recError ? (
        <div>{recError.message}</div>
      ) : (
        <div>
          <h3 className="text-3xl tracking-wide">More like this</h3>

          <span className="flex w-full gap-5 h-[30rem] overflow-x-auto p-6">
            {recommendations.slice(0, 10).map((rec: any) => (
              <div key={rec.id} className="flex-shrink-0 w-64">
                <MovieCard movie={rec} />
              </div>
            ))}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default Recommendations;
