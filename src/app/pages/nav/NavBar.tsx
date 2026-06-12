import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search, X, Menu } from "lucide-react";
import { ModeToggle } from "@/app/components/ModeToggle.tsx";
import tmdbLogo from "@/Assets/the real logo.svg";
import { Avatar, IconButton } from "@material-tailwind/react";
import { useSearchStore } from "@/app/store/searchStore.ts";
import CustomInput from "@/app/components/ui/custom-input";
import { useUser } from "@/app/hooks/user/useUser";
import {
  HouseIcon,
  HeartIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";

const LINKS = [
  {
    icon: HouseIcon,
    title: "Home",
    href: "/",
  },
  {
    icon: HeartIcon,
    title: "Favourites",
    href: "/want-to-watch",
  },
];

function NavList({ closeMenu }: { closeMenu: () => void }) {
  const location = useLocation();

  return (
    <ul className="mt-4 flex flex-col gap-y-3 lg:mt-0 lg:flex-row lg:items-center lg:gap-x-6">
      {LINKS.map(({ icon: Icon, title, href }) => {
        const isActive = location.pathname === href;

        return (
          <li key={title}>
            <Link
              to={href}
              onClick={closeMenu}
              className="flex items-center gap-x-2 p-2 text-sm font-medium transition-colors duration-100 group"
            >
              <div
                className={`flex items-center justify-center ${
                  isActive
                    ? "rounded-full bg-black text-white p-2 transition-all duration-500 dark:bg-white dark:text-black"
                    : ""
                }`}
              >
                <Icon size={25} weight={isActive ? "fill" : "regular"} />
              </div>

              <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">
                {title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function NavBar() {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { searchQuery, setSearchQuery } = useSearchStore();

  const { fetchedUser, userLoading: isUserLoading } = useUser();

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
      className={`sticky top-0 z-50 w-full  p-3  mt-1 ${
        isScrolled && "bg-white dark:bg-[#0f0e0e]"
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

            <CustomInput
              placeholder="Search here..."
              icon={<MagnifyingGlassIcon size={20} />}
              type="text"
              className="hidden lg:flex"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e);
              }}
              searchClear={() => setSearchQuery("")}
            />

            {/* Mobile Search Input */}
            <div
              className={`absolute left-0 z-50 top-16 w-full px-4 py-3  transition-all duration-300 ${
                showSearchInput
                  ? "translate-y-0 bg-white dark:bg-[#0f0e0e]"
                  : "-translate-y-full opacity-0 pointer-events-none"
              }`}
            >
              <CustomInput
                placeholder="Search here..."
                icon={<MagnifyingGlassIcon size={20} />}
                type="text"
                value={searchQuery}
                searchClear={() => setSearchQuery("")}
                onChange={(e) => {
                  setSearchQuery(e);
                }}
              />
            </div>
            {/* Mobile search button */}
            <IconButton
              isCircular
              variant="ghost"
              color="secondary"
              onClick={toggleSearchInput}
              className="rounded-full  lg:hidden"
            >
              <Search />
            </IconButton>
            {/* Profile pic */}

            {isUserLoading ? (
              <IconButton
                className="hidden md:flex items-center  animate-pulse justify-center "
                disabled
                color="secondary"
                isCircular
                size="lg"
              ></IconButton>
            ) : (
              fetchedUser && (
                <Avatar
                  src={
                    fetchedUser?.picture ||
                    `https://api.dicebear.com/10.x/thumbs/svg?seed=felix`
                  }
                  onClick={() => navigate("/account")}
                  className="hidden md:block cursor-pointer border"
                />
              )
            )}

            {/* Theme toggle */}
            <div className="">
              <ModeToggle />
            </div>
            {/* Mobile menu button */}
            <IconButton
              isCircular
              variant="ghost"
              onClick={() => {
                setOpenNav(!openNav);
                setShowSearchInput(false);
              }}
              className="lg:hidden"
            >
              {openNav ? <X /> : <Menu />}
            </IconButton>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`transform overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
            openNav ? "max-h-96 py-4" : "max-h-0"
          }`}
        >
          <NavList closeMenu={closeMenu} />
          {isUserLoading ? (
            <IconButton
              className="hidden md:flex items-center  animate-pulse justify-center "
              disabled
              color="secondary"
              isCircular
              size="lg"
            ></IconButton>
          ) : (
            fetchedUser && (
              <Avatar
                src={
                  fetchedUser?.picture ||
                  `https://api.dicebear.com/10.x/thumbs/svg?seed=felix`
                }
                onClick={() => {
                  closeMenu();
                  navigate("/account");
                }}
                className="mt-3 cursor-pointer"
              />
            )
          )}
        </div>
      </div>
    </nav>
  );
}
