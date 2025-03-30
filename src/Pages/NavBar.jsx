import * as React from "react";
import {
  IconButton,
  Typography,
  Collapse,
  Navbar,
  Input,
} from "@material-tailwind/react";
import tmdbLogo from "../Assets/the real logo.svg";
import { Search, Video, Home, User, X, Menu, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearch } from "../Contexts/SearchContext";

const LINKS = [
  {
    icon: Home,
    title: "Home",
    href: "/",
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
  return (
    <ul className="mt-4 flex flex-col gap-x-6 gap-y-2 lg:mt-0 lg:flex-row lg:items-center">
      {LINKS.map(({ icon: Icon, title, href }) => (
        <li key={title}>
          <Link to={href} onClick={closeMenu}>
            <Typography
              as="a"
              type="medium"
              className="flex items-center gap-x-2 p-1 hover:text-primary"
            >
              <Icon className="h-4 w-4" />
              {title}
            </Typography>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function NavBar() {
  const [openNav, setOpenNav] = React.useState(false);

  const { searchQuery, setSearchQuery } = useSearch();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => {
    if (window.innerWidth < 960) {
      setOpenNav(false);
    }
  };

  return (
    <Navbar className="mx-auto w-full max-w-screen-xl rounded-2xl fixed z-50 ">
      <div className="flex items-center">
        <Link to="/">
          <img
            src={tmdbLogo}
            alt="Tmdb Mini"
            height={100}
            width={100}
            className="mr-3 mx-3"
          />
        </Link>

        <hr className="ml-1 mr-1.5 hidden h-5 w-px border-l border-t-0 border-secondary-dark lg:block" />

        <div className="hidden lg:block">
          <NavList closeMenu={closeMenu} />
        </div>

        <div className="ml-auto w-40 md:w-72">
          <Input
            size="md"
            type="search"
            placeholder="Search Movies..."
            className="w-[9.5rem] h-[2rem] md:w-[17rem] md:h-[2.5rem]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          >
            <Input.Icon>
              <Search className="h-full w-full" />
            </Input.Icon>
          </Input>
        </div>

        <IconButton
          size="sm"
          variant="ghost"
          onClick={() => setOpenNav(!openNav)}
          className="ml-1 grid lg:hidden"
        >
          {openNav ? <X size={30} /> : <Menu size={30} />}
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <NavList closeMenu={closeMenu} />
      </Collapse>
    </Navbar>
  );
}
