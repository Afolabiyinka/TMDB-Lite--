import { Outlet } from "react-router-dom";
import useMovies from "../../hooks/movies/useMovies";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";

const AuthLayout = () => {
  const { movies, error, isLoading } = useMovies();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-screen p-6 flex flex-col md:flex-row justify-center items-center gap-4">
      <div
        className={`w-full h-full md:block hidden md:w-1/2 rounded-3xl overflow-hidden shadow ${error || (isLoading && "border")}`}
      >
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 10000, disableOnInteraction: false }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          loop
          className="w-full h-full"
        >
          {movies.map((movie, i) => (
            <SwiperSlide key={i} className="relative">
              <motion.img
                key={activeIndex === i ? `active-${i}` : `idle-${i}`}
                initial={{ scale: 1.08, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black text-white  px-6 py-1">
                <motion.p
                  key={`title-${activeIndex}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl tracking-wider font-[Bebas_Neue]"
                >
                  {movie.title}
                </motion.p>
                <p className="text-sm">
                  {movie?.release_date
                    ? new Date(movie.release_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Release date unknown"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full h-full md:w-1/2 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
