import { Typography } from "@material-tailwind/react";
import tmLogo from "../Assets/the real logo.svg";
import { Link } from "react-router-dom";

const LINKS = [
  {
    title: "About Us",
    href: "#",
  },

  {
    title: "Contribute",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="w-full px-4 shadow-sm">
      <div className="flex w-full flex-row flex-wrap items-center justify-center gap-x-12 gap-y-3 text-center md:justify-between">
        <Link to="/">
          <img src={tmLogo} alt="brand" className="w-[120px] h-[30px]" />
        </Link>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {LINKS.map(({ title, href }, key) => (
            <li key={key}>
              <Link to={href}>
                <Typography as="a" href={href} className="hover:text-primary">
                  {title}
                </Typography>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
