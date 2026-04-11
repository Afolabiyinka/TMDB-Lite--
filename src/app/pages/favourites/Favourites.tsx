import { motion } from "framer-motion";
import MovieCard from "../../components/movie/MovieCard";
import { Link } from "react-router-dom";
import { Film, Heart } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { useFavourites } from "@/app/hooks/favourites/useFavourites";
import MovieCardSkeleton from "@/app/components/movie/DummyCard";
import ScrollableCardRow from "@/app/components/ScrollableSection";

const Favourites = () => {
  const { data, isLoading } = useFavourites();

  if (isLoading) {
    return (
      <div className="w-screen h-full">
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
        <div className="flex justify-center items-center flex-col text-center h-screen gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-full  border  flex items-center justify-center">
              <Heart size={48} strokeWidth={1} />
            </div>
            <span className="absolute inset-0 rounded-full border  duration-1000" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            <h1 className="text-4xl tracking-widest font-[Bebas Neue] font-semibold">
              No Favourites Yet
            </h1>
            <p className="text-sm max-w-xs leading-relaxed">
              Start adding movies to your favourites and they'll appear here.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
          >
            <Link to={"/"}>
              <Button isPill size="xl">
                <Film size={20} className="mr-2" />
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
