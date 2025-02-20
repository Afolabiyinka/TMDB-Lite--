import Modal from "react-modal";
import { BsBookmark } from "react-icons/bs";
import { useTheme } from "../../Contexts/ThemeContext";
import { useState } from "react";

const MovieModal = ({ isOpen, movie, onClose }) => {
  const { theme } = useTheme();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      padding: "0",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "900px",
      height: "auto",
      maxHeight: "95vh",
      border: "none",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  const [votes, setVotes] = useState(0);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className="w-full bg-orange-400 flex flex-col md:flex-row rounded-md overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full rounded-lg md:w-1/2 object-cover h-64 md:h-auto"
        />
        <div
          className={` ${theme} rounded-md h-full justify-center p-4 md:p-10 gap-3 flex flex-col`}
        >
          <h1 className="text-2xl md:text-4xl font-sans font-bold">
            {movie.title}
          </h1>
          <h3>{movie.release_date}</h3>
          <p>{movie.overview}</p>
          <span>
            <p
              className="text-xs border-2 p-2 w-fit rounded-lg cursor-pointer hover:px-8 transition-all hover:bg-gradient-to-r hover:from-red-500 duration-300 hover:to-yellow-500"
              onClick={() => setVotes(votes + 1)}
            >
              {votes} : votes
            </p>
          </span>
          <div className="flex flex-col md:flex-row gap-2">
            <button className="flex justify-center bg-red-500 p-2 rounded-md items-center hover:px-5 transition-all hover:bg-gradient-to-r hover:from-red-500 duration-300 hover:to-yellow-500">
              <BsBookmark color="white" size={30} />
              <span className="ml-2">Add to Favourites</span>
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieModal;
