import { ReactNode } from "react";
export interface MovieType {
  id: number | string;
  title?: string;
  poster?: string;
  [key: string]: any; // ✅ Allows unlimited extra fields without TypeScript stress
}


export interface favouritesFunctionProps {
  movieId: number | string;
}

export interface FavouritesProps {
  children: ReactNode;
}

export interface FavouritesContextType {
  favourites: MovieType[];
  addToFavourites: (movie: MovieType) => void;
  removeFromFavourites: ({ movieId }: favouritesFunctionProps) => void;
  isFavourite: ({ movieId }: favouritesFunctionProps) => boolean;
}