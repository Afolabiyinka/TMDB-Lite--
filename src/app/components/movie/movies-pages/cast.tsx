import { motion } from "framer-motion";
import Loader from "../../Loader";

interface CastsProps {
  casts: [];
  castsLoading: boolean;
  noCast: any;
}
const Cast = ({ casts, castsLoading, noCast }: CastsProps) => {
  return (
    <div className="relative w-full">
      {castsLoading ? (
        <div className="p-8">
          <Loader />
        </div>
      ) : noCast ? (
        <div>No cast found</div>
      ) : casts.length === 0 ? (
        <div>No cast available</div>
      ) : (
        <motion.div
          className="grid grid-flow-col-dense w-full gap-5 overflow-x-auto p-2"
          initial="hidden"
          animate="visible"
        >
          {casts.map(
            (cast: {
              id: number;
              name: string;
              profile_path: string;
              character: string;
            }) => (
              <a
                target="_blank"
                href={`https://www.google.com/search?q=${cast.name}`}
              >
                <div className="w-[9rem] shadow-lg rounded-xl flex flex-col overflow-hidden h-full">
                  <img
                    className="w-full h-36 object-cover shadow-lg bg-gray-400"
                    src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                    // alt={cast.name}
                  />
                  <div className="p-2 flex flex-col items-center text-center">
                    <p className="font-semibold text-sm">{cast.name}</p>
                    <p className="text-xs text-gray-500">as {cast.character}</p>
                  </div>
                </div>
              </a>
            )
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Cast;
