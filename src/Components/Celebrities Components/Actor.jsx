import React, { useState } from "react";

const Actor = ({ actor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="bg-[#191919] rounded-md shadow-lg w-full overflow-hidden flex flex-col p-2 gap-2 transition-all duration-300">
      {/* Actor Profile */}
      <img
        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
        alt={actor.original_name}
        className="w-full h-72 object-cover rounded-md"
      />

      {/* Actor Info */}
      <div className="flex flex-col justify-center gap-2 p-3 bg-[#191919] rounded-md text-white">
        <div>
          <h1 className="text-2xl font-bold">{actor.original_name}</h1>
          <p className="text-sm text-gray-400">{actor.media_type || "Actor"}</p>
          <p className="text-sm text-gray-400">{actor.known_for_department}</p>
        </div>

        <button
          className="py-2 rounded-md duration-300 px-8 transition-all bg-gradient-to-r from-red-500 to-yellow-500 hover:px-14"
          onClick={handleOpenModal}
        >
          View
        </button>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#191919] p-5 rounded-md shadow-lg relative max-w-md w-fit text-white">
              <button
                className="absolute top-2 right-2 text-2xl"
                onClick={handleCloseModal}
                aria-label="Close Modal"
              >
                &times;
              </button>
              <h2 className="text-xl font-semibold">{actor.original_name}</h2>
              <p className="text-sm">{actor.media_type || "Actor"}</p>
              <p className="text-sm">{actor.known_for_department}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Actor;
