import { useState } from "react";
import MovieModal from "./MovieDescription";
import { Card, Typography, Button } from "@material-tailwind/react";
// import { useFavourites } from "../../Contexts/MovieContext";yy

export default function MovieCard({ movie }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Card className=" overflow-hidden w-[22rem] md:w-[25rem]">
      <Card.Header
        as="img"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="profile-picture"
        className="h-80 object-fill"
      />
      <Card.Body className="p-2">
        <Typography type="h5" className="text-base overflow-hidden">
          {movie.title}
        </Typography>
        <Typography className="text-sm">
          {movie.release_date.split("-")[0]}
        </Typography>
      </Card.Body>
      <Card.Footer className="p-2">
        <span>
          <Button
            className="py-2 text-sm rounded-md duration-300 px-12 transition-all bg-gradient-to-r from-red-500 to-yellow-500 hover:px-14"
            onClick={handleOpenModal}
          >
            View
          </Button>
          {isOpen && (
            <MovieModal
              isOpen={isOpen}
              onClose={handleCloseModal}
              movie={movie}
            />
          )}
        </span>
      </Card.Footer>
    </Card>
  );
}
