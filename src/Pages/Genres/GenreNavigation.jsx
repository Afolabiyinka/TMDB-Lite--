import { Chip } from "@material-tailwind/react";
import { Swords, Heart, Laugh, Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GenreNav() {
  const navigate = useNavigate();

  return (
    <div className="mt-[4.5rem] px-4">
      <div className="flex flex-wrap justify-center md:justify-start gap-2 overflow-x-auto py-2">
        {[
          { name: "Action", icon: Swords, path: "/action" },
          { name: "Romance", icon: Heart, path: "/romance" },
          { name: "Comedy", icon: Laugh, path: "/comedy" },
          { name: "Horror", icon: Ghost, path: "/horror" },
        ].map(({ name, icon: Icon, path }) => (
          <Chip
            key={name}
            variant="ghost"
            className="flex items-center gap-1 px-2 py-1"
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
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
