import React, { useState, useContext, useEffect, createContext } from "react";

interface Movie {
  id: string | number;
  title?: string;
  name?: string;
  [key: string]: any;
}
interface ContextType {
  favourites: Movie[];
  addToFavourites: (movie: Movie) => void;
  removeFromFavourites: (movieId: string | number) => void;
  isFavourite: (movieId: string | number) => boolean;
}

interface ProviderProps {
  children?: React.ReactNode;
}

const Context = createContext<ContextType | null>(null);

export const useFavourites = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("use must be used within a Provider");
  }
  return context;
};

export const FavouritesProvider = ({ children }: ProviderProps) => {
  const [favourites, setFavourites] = useState<Movie[]>(() => {
    const stored = localStorage.getItem("Favourites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("Favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (movie: Movie) => {
    setFavourites((current) => [...current, movie]);
  };

  const removeFromFavourites = (movieId: string | number) => {
    setFavourites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavourite = (movieId: string | number) => {
    return favourites.some((movie) => movie.id === movieId);
  };

  const value: ContextType = {
    isFavourite,
    addToFavourites,
    removeFromFavourites,
    favourites,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
