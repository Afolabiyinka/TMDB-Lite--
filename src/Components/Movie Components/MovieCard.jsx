import { useState } from "react";

import MovieModal from "./MovieDescription";
import {
  Card,
  Typography,
  IconButton,
  Tooltip,
  Button,
} from "@material-tailwind/react";

// const MovieCard = ({ movie }) => {

//   return (
//     <div
//       className={`movie-card ${theme} rounded-lg border-2  ${
//         theme === "dark" ? "bg-[#252525]" : "bg-white"
//       } ${theme === "dark" ? "border-black" : "border-gray-100"}`}
//     >
//       {/* Movie Poster */}
//       <img
//         src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//         alt={movie.title}
//         className="w-full h-96 transition-all rounded-lg"
//       />

//       {/* Movie Info */}
//       <div className="flex flex-col justify-center gap-2 p-2 rounded-md items-start">
//         <span>
//           <h1 className="text-xl font- transition-transform duration-500">
//             {movie.title}
//           </h1>
//           <p className="text-xs">{movie.release_date.split("-")[0]}</p>
//         </span>
//
//       </div>
//     </div>
//   );
// };

// export default MovieCard;

export default function ProfileCard({ movie }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <Card className="max-w-xl max-h-xl">
      <Card.Header
        as="img"
        src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
        alt="profile-picture"
      />
      <Card.Body className="">
        <Typography type="h5">{movie.title}</Typography>
        <Typography className="my-1 text-foreground">
          {movie.release_date.split("-")[0]}
        </Typography>
      </Card.Body>
      <Card.Footer>
        <span>
          <Button
            className="py-2 rounded-md duration-300 px-8 transition-all bg-gradient-to-r from-red-500 to-yellow-500 hover:px-14"
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
