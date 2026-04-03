import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Heart } from "lucide-react";
import tmdbLogo from "../../../Assets/the real logo.svg";

const LINKS = [
  { title: "About Us", href: "#" },
  { title: "Contribute", href: "#" },
];

const GENRES = [
  "Action",
  "Drama",
  "Comedy",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Romance",
  "Animation",
];

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-inherit  mt-20">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="relative mr-2"></div>
              <img src={tmdbLogo} className="h-8 w-[10rem]" alt="Tmdb-Logo" />
            </Link>
          </div>
          <p className="text-sm leading-relaxed max-w-[220px]">
            Discover, explore, and obsess over films. Powered by TMDB.
          </p>
          <div className="flex gap-3 mt-1">
            <a
              href="https://github.com/Afolabiyinka/TMDB-Lite--"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center /40 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200"
            >
              <Github size={15} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center /40 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200"
            >
              <Twitter size={15} />
            </a>
          </div>
        </div>

        {/* Browse Genres */}
        <div className="flex flex-col gap-4">
          <h3
            className="/30 text-xs tracking-[0.2em] uppercase"
            style={{
              letterSpacing: "0.25em",
            }}
          >
            Browse Genres
          </h3>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((genre) => (
              <span
                key={genre}
                className="text-xs px-3 py-1 rounded-full border border-white/10 /50 hover:border-yellow-400/60 hover:text-yellow-400 cursor-pointer transition-all duration-200"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4">
          <h3
            className="/30 text-xs tracking-[0.2em] uppercase"
            style={{
              letterSpacing: "0.25em",
            }}
          >
            Company
          </h3>
          <ul className="flex flex-col gap-3">
            {LINKS.map(({ title, href }) => (
              <li key={title}>
                <a
                  href={href}
                  className="/50 hover: text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-4 h-px bg-white/20 group-hover:w-6 group-hover:bg-yellow-400 transition-all duration-300" />
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="/20 text-xs">
          © {new Date().getFullYear()} TMDB-Mini. All rights reserved.
        </p>
        <p className="/20 text-xs flex items-center gap-1">
          Made with <Heart size={10} className="text-red-500 fill-red-500" />{" "}
          using the TMDB API
        </p>
      </div>
    </footer>
  );
};

export default Footer;
