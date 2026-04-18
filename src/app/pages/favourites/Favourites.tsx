import { motion } from "framer-motion";
import MovieCard from "../../components/movie/MovieCard";
import { Link } from "react-router-dom";
import { Film, Heart } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { useFavourites } from "@/app/hooks/favourites/useFavourites";
import MovieCardSkeleton from "@/app/components/movie/DummyCard";
import ScrollableCardRow from "@/app/components/ScrollableSection";

const Favourites = () => {
  const { data, isLoading, error } = useFavourites();

  if (isLoading || error) {
    return (
      <div className="w-screen h-full p-10 flex justify-center items-center">
        <ScrollableCardRow>
          {Array.from({ length: 15 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </ScrollableCardRow>
      </div>
    );
  }

  return (
    <div className="text-center flex justify-center items-center w-full">
      {data?.favourites?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen gap-6 relative overflow-hidden w-full">

          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="rounded-full  border shadow-2xl flex items-center justify-center relative overflow-hidden p-10">
              {/* Icon */}
              <Heart size={64} className="text-red-500 stroke-[1px]" fill="red" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center z-10"
          >
            <h1 className="text-4xl font-bold tracking-wide">
              No Favourites Yet
            </h1>
            <p className="text-sm  mt-2 max-w-xs">
              Save movies you love. They’ll appear here like your personal
              watchlist.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="z-10"
          >
            <Link to="/">
              <Button size="xl" isPill>
                <Film size={18} className="mr-2" />
                Browse Movies
              </Button>
            </Link>
          </motion.div>
        </div>
      ) : (
        <div className="py-3 flex flex-col items-center  h-full w-screen p-10">
          <h1 className="text-4xl mb-3">
            {data?.favourites.length} Movies added to Favourites
          </h1>

          <ScrollableCardRow>
            {data?.favourites?.map((movie) => (
              <div className="flex-shrink-0 w-80" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </ScrollableCardRow>
        </div>
      )}
    </div>
  );
};

export default Favourites;
