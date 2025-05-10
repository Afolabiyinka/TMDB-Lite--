import { useState, useEffect } from "react";
import MovieCard from "../Components/MovieCard";
import { getPopularMovies, searchMovies } from "../Utilities/request";
import { Swiper, SwiperSlide } from "swiper/react";
import { ToastContainer, toast, Bounce } from "react-toastify";

const Home = () => {
  //Declaring the useStates
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState();

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(toast("Pls be Patient"));
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(toast("Loading Movies"));
    } catch (err) {
      console.log(err);
      // setError("Failed to get movies...");
      setError(toast);
      setLoading(false);
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  }

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setTimeout(() => {
          toast("Loading Movies");
        }, 3000);

        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  return (
    <>
      <div className="bg-[#141414] flex justify-center h-[12vh] items-center transition-all">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            className="w-[28rem] h-[2.5rem] rounded-sm bg-[#252525] p-3 text-white "
            type="text"
            placeholder="Search your Favorite Movies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-600 h-[2.5rem] rounded-sm w-[5rem] hover:outline-blue-700"
          >
            Search
          </button>
          <ToastContainer />
        </form>
        {error && (
          <div>
            {toast.error(" Couldnt Connect to our servers", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,

              theme: "dark",
              transition: Bounce,
            })}
          </div>
        )}
      </div>
      <Swiper className="min-h-screen bg-[#252525] text-white flex justify-center items-center w-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 p-4 md:p-8 justify-center w-screen">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </Swiper>
    </>
  );
};

export default Home;
