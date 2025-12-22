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
  const popularity = actor.popularity
    ? Math.min(10, Math.round(actor.popularity / 10))
    : null;

  return (
    <Card className="w-full overflow-hidden shadow-lg rounded-3xl cursor-pointer hover:scale-[1.02] transition-transform duration-300">
      <div
        className={`absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-10`}
      />

      {popularity && (
        <div className="absolute top-3 left-3 z-20">
          <Badge className="bg-black/70 px-3 py-1 rounded-full text-white border border-yellow-400">
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
              <span>{popularity.toFixed(1)}</span>
            </div>
          </Badge>
        </div>
      )}

      {actor.popularity > 80 && (
        <div className="absolute top-3 right-3 z-20">
          <Badge className="bg-red-500 px-3 py-1 rounded-full text-white">
            <div className="flex items-center">
              <Award className="h-3 w-3 text-white mr-1" />
              <span>Popular</span>
            </div>
          </Badge>
        </div>
      )}

      {/* Card Header with Actor Image */}
      <a
        target="_blank"
        href={`https://www.google.com/search?q=${actor.name}`}
        className="relative overflow-hidden"
      >
        <Card.Header as="div" className="h-80 overflow-hidden">
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={actor.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/70" />
        </Card.Header>

        {actor.known_for && actor.known_for.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
            <Typography className="text-white text-xs font-medium mb-1">
              Known For:
            </Typography>
            {/* <div className="flex flex-wrap gap-1">
              {actor.known_for.slice(0, 3).map((work, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full bg-gray-800 text-xs text-white"
                >
                  <Film className="h-2 w-2 mr-1" />
                  {work.title || work.name}
                </span>
              ))}
            </div> */}
          </div>
        )}
      </a>

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
