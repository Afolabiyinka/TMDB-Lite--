import tmdbLogo from "@/Assets/tmdb_logo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center">
        <div className="relative mr-2"></div>
        <img src={tmdbLogo} className="h-8 w-[10rem]" alt="Tmdb-Logo" />
      </Link>
    </div>
  );
};

export default Logo;
