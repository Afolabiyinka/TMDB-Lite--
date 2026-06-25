import { Chip, IconButton } from "@material-tailwind/react";
import { GithubLogoIcon, XLogoIcon, UserIcon } from "@phosphor-icons/react";
import { HeartIcon } from "lucide-react";
import Logo from "@/app/components/ui/Logo";

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

const Footer = () => {
  return (
    <footer className="w-full bg-inherit  mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-sm leading-relaxed max-w-[220px]">
            Discover, explore, and obsess over films. Powered by TMDB.
          </p>
          <div className="flex gap-3 mt-1">
            <a
              href="https://github.com/Afolabiyinka/TMDB-Lite--"
              target="_blank"
              rel="noreferrer"
            >
              <IconButton isCircular variant="outline">
                <GithubLogoIcon size={18} />
              </IconButton>
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <IconButton isCircular variant="outline">
                <XLogoIcon size={15} />
              </IconButton>
            </a>
            <a
              href="https://olayinka-portfolio1.vercel.app"
              target="_blank"
              rel="noreferrer"
            >
              <IconButton isCircular variant="outline">
                <UserIcon size={15} />
              </IconButton>
            </a>
          </div>
        </div>

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
            {GENRES.map((genre, i) => (
              <Chip
                size="lg"
                variant="ghost"
                color="secondary"
                key={i}
                className="px-4 cursor-pointer"
              >
                {genre}
              </Chip>
            ))}
          </div>
        </div>

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
                  <span className="w-4 h-px bg-gray-500 group-hover:w-6 group-hover:bg-black dark:group-hover:bg-white transition-all duration-300" />
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="/20 text-sm">
          © {new Date().getFullYear()} TMDB-Mini. All rights reserved.
        </p>
        <p className="/20 text-sm flex items-center gap-1">
          Made with{" "}
          <HeartIcon size={14} className="text-red-500 fill-red-500" /> using
          the TMDB API
        </p>
      </div>
    </footer>
  );
};

export default Footer;
