import { type ReactNode } from "react";
export interface Movie {
  id: string | number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  [key: string]: any;
}
export interface favouritesFunctionProps {
  movieId: number | string;
}

export interface FavouritesProps {
  children: ReactNode;
}

export interface FavouritesContextType {
  favourites: Movie[];
  addToFavourites: (movie: Movie) => void;
  removeFromFavourites: ({ movieId }: favouritesFunctionProps) => void;
  isFavourite: ({ movieId }: favouritesFunctionProps) => boolean;
}
