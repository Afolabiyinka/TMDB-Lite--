import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, Video, Home, X, Menu, Clapperboard } from "lucide-react";
import { ModeToggle } from "../../components/ModeToggle.tsx";
import tmdbLogo from "../../../Assets/the real logo.svg";
import { Avatar, Input } from "@material-tailwind/react";
import { useUserStore } from "../../store/userStore.ts";
import { useSearchStore } from "../../store/searchStore.ts";

const LINKS = [
  {
    icon: Home,
    title: "Home",
    href: "/",
  },
  {
    icon: Clapperboard,
    title: "Want to watch",
    href: "/want-to-watch",
  },

  {
    icon: Video,
    title: "Celebrities",
    href: "/celebrities",
  },
];

function NavList({ closeMenu }: { closeMenu: () => void }) {
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
              className={`"flex items-center justify-center" ${
                location.pathname === href
                  ? "rounded-full bg-black text-white p-2 transition-all duration-500 dark:bg-white dark:text-black "
                  : ""
              }`}
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
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { searchQuery, setSearchQuery } = useSearchStore();

  const { user } = useUserStore();

  // inside NavBar

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length > 0) {
      navigate({
        pathname: "/search",
        search: `?q=${encodeURIComponent(trimmedQuery)}`,
      });
    }
  }, [searchQuery, navigate]);

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
      className={`sticky top-0 z-50 w-full transition-all duration-300 p-1 rounded-3xl md:rounded-full mt-2  mx-2 ${
        isScrolled ? "backdrop-blur-lg" : ""
      }`}
    >
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
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
              <Input
                type="search"
                placeholder="Search movies..."
                className="w-72 rounded-full  py-3 pl-10 pr-4 text-sm "
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 " />
            </div>

            {/* Mobile Search Input */}
            <div
              className={`absolute left-0 top-16 w-full px-4 py-3 shadow-md transition-all duration-300 ${
                showSearchInput
                  ? "translate-y-0 dark:bg-black bg-white"
                  : "-translate-y-full opacity-0 pointer-events-none"
              }`}
            >
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search movies..."
                  className="py-3 pl-10 pr-4 text-sm rounded-full"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4" />
                <button
                  onClick={toggleSearchInput}
                  className="absolute right-3 top-2.5 ml-3"
                ></button>
              </div>
            </div>

            {/* Mobile search button */}
            <button
              onClick={toggleSearchInput}
              className="rounded-full p-2 ml-4 lg:hidden"
            >
              <Search className="h-6 w-6" />
            </button>

            {/* Theme toggle */}
            <div className="">
              <ModeToggle />
            </div>

            <Avatar
              src={user?.picture}
              onClick={() => navigate("/account")}
              className="hidden md:block"
            />
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
          <Avatar
            src={user?.picture}
            onClick={() => {
              closeMenu();
              navigate("/account");
            }}
            className="mt-3"
          />
        </div>
      </div>
    </nav>
  );
}
