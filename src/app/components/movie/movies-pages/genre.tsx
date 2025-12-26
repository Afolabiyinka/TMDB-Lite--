import { Chip } from "@material-tailwind/react";
import type { MovieType } from "../../../types/movie";

const Genres = ({ movie }: MovieType) => {
  return (
    <div className="w-full">
      <span className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {movie.genres.map((genre: { name: string; id: number }) => (
          <Chip
            variant="outline"
            key={genre.id}
            color="secondary"
            className="flex items-center justify-center gap-1 w-full py-2.5 sm:w-auto"
          >
            {genre.name}
          </Chip>
        ))}
      </span>
    </div>
  );
};

export default Genres;
