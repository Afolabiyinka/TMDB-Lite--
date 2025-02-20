import React from "react";
import { ModeToggle } from "../Contexts/ModeToggle";
import { useTheme } from "../Contexts/ThemeContext";
import { Link } from "react-router-dom";
import { Home, HeartIcon, Video } from "lucide-react";
import MobileNavBar from "./MobileNavBar";

const NavBar = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`h-[10vh] ${theme}  w-full  flex items-center justify-between px-4 `}
    >
      <Link to="/">
        <h1 className="text-xl transition-all duration-500 font-bold hover:text-blue-600 ">
          TDMB Lite ✨
        </h1>
      </Link>
      {/*Desktop Navbar*/}
      <ul className=" hidden lg:flex gap-8">
        <li>
          <Link
            to="/" 
            className="flex gap-2 rounded-md py-1 px-2 hover:transition-all hover:bg-gradient-to-r hover:from-red-500 duration-300focus:to-yellow-500"
          >
            <Home />
            Home
          </Link>
        </li>
        <Link
          to="/Favourites"
          className="flex gap-2 rounded-md px-2 py-1 hover:transition-all hover:bg-gradient-to-r focus:from-red-500 duration-300 focus:to-yellow-500"
        >
          <HeartIcon />
          Favourites
        </Link>
        <Link
          to="/trending-actors"
          className="flex gap-2 rounded-md px-2 py-1 hover:transition-all hover:bg-gradient-to-r hover:from-red-500 duration-300 hover:to-yellow-500"
        >
          <Video />
          Celebrites
        </Link>
      </ul>
      <ModeToggle />
      <MobileNavBar />
    </div>
  );
};

export default NavBar;
