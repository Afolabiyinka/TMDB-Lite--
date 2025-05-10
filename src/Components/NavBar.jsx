import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex justify-between px-14 h-[11vh] items-center  bg-gray-900  text-blue-600">
      <Link to="/" className="text-2xl cursor-pointer hover:text-blue-400">
        Movie Tracker
      </Link>

      <div className="gap-12 flex font-sans">
        <Link
          to="/"
          className="hover:bg-gray-500 px-3 transition-all py-2 duration-400 rounded-lg"
        >
          Home{" "}
        </Link>
        <Link
          to="/favourites"
          className="hover:bg-gray-500 px-3 transition-all py-2 duration-400 rounded-lg"
        >
          Favourites
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
