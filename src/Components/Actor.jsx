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
    <div className="bg-[#191919] rounded-md shadow-lg w-full overflow-hidden flex flex-col p-1 gap-1 transition-all duration-300">
      {/* Actor Profile */}
      <img
        src={`https://image.tmdb.org/t/p/w400/${actor.profile_path}`}
        alt={actor.original_name}
        className="w-full h-72 object-cover rounded-md"
      />

      {/* Actor Info */}
      <div className="flex flex-col justify-center gap-2 p-2 bg-[#191919] rounded-md text-white items-start">
        <span>
          <h1 className="text-2xl overflow-hidden transition-transform duration-500">
            {actor.original_name}
          </h1>
          <p className="text-xs">{actor.media_type}</p>
          <p className="text-xs">{actor.known_for_department}</p>
        </span>
        <span>
          <button
            className="py-2 rounded-md duration-300 px-8 transition-all bg-gradient-to-r from-red-500 to-yellow-500 hover:px-14"
            onClick={handleOpenModal}
          >
            View
          </button>
          {isOpen && (
            <div className="modal">
              {/* Modal content */}
              <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>
                  &times;
                </span>
                <p>{actor.original_name}</p>
                <p>{actor.media_type}</p>
                <p>{actor.known_for_department}</p>
              </div>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default Actor;
