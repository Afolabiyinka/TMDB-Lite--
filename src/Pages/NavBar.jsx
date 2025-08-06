import * as React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, Video, Home, User, X, Menu, Heart } from "lucide-react";
import { useSearch } from "../Contexts/SearchContext";
import { ModeToggle } from "../Contexts/ModeToggle";

import tmdbLogo from "../Assets/the real logo.svg";

const LINKS = [
  {
    icon: Home,
    title: "Home",
    href: "/movies",
  },
  {
    icon: Heart,
    title: "Favourites",
    href: "/Favourites",
  },

  {
    icon: Video,
    title: "Celebrities",
    href: "/celebrities",
  },
  {
    icon: User,
    title: "Account",
    href: "/Account",
  },
];

function NavList({ closeMenu }) {
  const location = useLocation();

  return (
    <ul className="mt-4 flex flex-col gap-y-3 lg:mt-0 lg:flex-row lg:items-center lg:gap-x-6">
      {LINKS.map(({ icon: Icon, title, href }) => (
        <li key={title}>
          <Link
            to={href}
            onClick={closeMenu}
            className="flex items-center gap-x-2 p-2 text-sm font-medium transition-colors duration-100 group"
          >
            <div
              className={`"flex items-center justify-center" ${location.pathname === href ? "rounded-lg  bg-gray-100 p-2 dark:bg-gray-800 " : ""}`}
            >
              <Icon className="h-4 w-4" />
            </div>
            <span
              className={`ml-1 transition-transform duration-300 group-hover:translate-x-1 `}
            >
              {title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function NavBar() {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const [showSearchInput, setShowSearchInput] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpenNav(false);
        setShowSearchInput(false);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    if (window.innerWidth < 1024) {
      setOpenNav(false);
    }
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
    setOpenNav(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 rounded-xl shadow-md ${
        isScrolled ? " shadow-sm backdrop-blur-lg" : ""
      }`}
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/movies" className="flex items-center">
              <div className="relative mr-2"></div>
              <img src={tmdbLogo} className="h-8 w-[10rem]" alt="Tmdb-Logo" />
            </Link>
          </div>

          <div className="hidden lg:block">
            <NavList closeMenu={closeMenu} />
          </div>

          <div className="flex items-center gap-x-4">
            {/* Desktop Search Input */}
            <div className="relative hidden lg:block">
              <input
                type="search"
                placeholder="Search movies..."
                className="w-64 rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  navigate("/movies");
                }}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Mobile Search Input */}
            <div
              className={`absolute left-0 top-16 w-full bg-white px-4 py-3 shadow-md transition-all duration-300 ${
                showSearchInput
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-full opacity-0 pointer-events-none"
              }`}
            >
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search movies..."
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    navigate("/movies");
                  }}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <button
                  onClick={toggleSearchInput}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                ></button>
              </div>
            </div>

            {/* Mobile search button */}
            <button
              onClick={toggleSearchInput}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 lg:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Theme toggle */}
            <div className="ml-2">
              <ModeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => {
                setOpenNav(!openNav);
                setShowSearchInput(false);
              }}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 lg:hidden"
            >
              {openNav ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`transform overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
            openNav ? "max-h-96 py-4" : "max-h-0"
          }`}
        >
          <NavList closeMenu={closeMenu} />
        </div>
      </div>
    </nav>
  );
}
