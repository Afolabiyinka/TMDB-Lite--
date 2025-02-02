import Modal from "react-modal";
import { BsBookmark } from "react-icons/bs";

const MovieModal = ({ isOpen, movie, onClose }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      padding: "20px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      height: "auto",
      maxHeight: "80vh",
      border: "none",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className="h-full w-full bg-orange-400 flex flex-col md:flex-row">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/2 rounded-md object-cover h-64 md:h-full"
        />
        <div className="bg-[#191919] text-white rounded-md h-full justify-center p-4 md:p-10 gap-2 flex flex-col">
          <h1 className="text-2xl md:text-4xl font-serif">{movie.title}</h1>
          <h3>{movie.release_date}</h3>
          <p>{movie.overview}</p>
          <span>
            <button className="flex justify-center bg-red-500 p-2 rounded-md items-center hover:px-8 transition-all hover:bg-gradient-to-r hover:from-red-500 duration-300 hover:to-yellow-500">
              <BsBookmark color="white" size={30} />
              Add to Favourites
            </button>

            <span>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={onClose}
              >
                Close
              </button>
            </span>
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default MovieModal;
