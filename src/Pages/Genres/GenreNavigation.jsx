import { Chip } from "@material-tailwind/react";
import { Swords, Heart, Laugh, Ghost, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GenreNav() {
  const navigate = useNavigate();

  return (
    <div className="mt-2 px-4">
      <div className="flex flex-wrap justify-center md:justify-start gap-2 py-2">
        {[
          { name: "Home", icon: Home, path: "/" },
          { name: "Action", icon: Swords, path: "/action" },
          { name: "Romance", icon: Heart, path: "/romance" },
          { name: "Comedy", icon: Laugh, path: "/comedy" },
          { name: "Horror", icon: Ghost, path: "/horror" },
        ].map(({ name, icon: Icon, path }) => (
          <Chip
            key={name}
            variant="ghost"
            isPill={false}
            className="flex items-center justify-center gap-1 px-2 py-1 w-[calc(33.333%-0.5rem)] sm:w-auto"
          >
            <Icon className="h-8 w-8 sm:h-6 sm:w-6" />
            <Chip.Label
              className="cursor-pointer text-sm sm:text-base"
              onClick={() => navigate(path)}
            >
              {name}
            </Chip.Label>
          </Chip>
        ))}
      </div>
    </div>
  );
}
