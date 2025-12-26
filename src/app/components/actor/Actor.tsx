import { Card, Typography, Badge } from "@material-tailwind/react";
import { Star, Award } from "lucide-react";

interface actor {
  actor: {
    popularity: number;
    name: string;
    profile_path: string;
    known_for_department: string;
    known_for: string;
    character: string;
  };
}
export default function Actor({ actor }: actor) {
  return (
    <Card
      as="a"
      target="_blank"
      href={`https://www.google.com/search?q=${actor.name}`}
      className="w-full overflow-hidden shadow-lg rounded-3xl cursor-pointer hover:scale-[1.02] transition-transform duration-300"
    >
      <Card.Header as="div" className="h-80 overflow-hidden">
        <img
          src={
            actor.profile_path &&
            `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
          }
          alt={actor.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Card.Header>

      {actor.known_for && actor.known_for.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
          <Typography className="text-white text-xs font-medium mb-1">
            Known For:
          </Typography>
        </div>
      )}

      <Card.Body className="p-3 relative z-10">
        <Typography
          variant="h5"
          className="font-bold text-lg mb-1 group-hover:text-red-500 transition-colors duration-300"
        >
          {actor.name}
        </Typography>

        <Typography className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          {actor.known_for_department && (
            <>
              <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
              {actor.known_for_department}
            </>
          )}
        </Typography>

        {actor.character && (
          <Typography className="text-xs text-gray-500 dark:text-gray-500 mt-1 italic">
            as {actor.character}
          </Typography>
        )}
      </Card.Body>
    </Card>
  );
}
