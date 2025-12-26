import { motion } from "framer-motion";
import MovieCard from "../../components/movie/MovieCard";
import { useFavouritesStore } from "../../store/favouritesStore";

const Favourites = () => {
  const { favourites } = useFavouritesStore();

  return (
    <div className=" text-center flex justify-center items-center w-full">
      {favourites.length === 0 ? (
        <div className="px-6 py-8 rounded-md flex justify-center  items-center flex-col text-center h-screen">
          <motion.h1
            className="text-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            You have no Favourites!
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
          <h1 className="text-4xl mb-3">
            {favourites.length} Movies added to Favourites
          </h1>

          <div className="grid grid-flow-col-dense w-full gap-5 overflow-x-auto p-10">
            {favourites.map((movie) => (
              <div className="flex-shrink-0 w-80">
                <MovieCard key={movie.id} movie={movie} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourites;
