import React, { useState, useContext, useEffect, createContext } from "react";

interface Movie {
  id: string | number;
  title?: string;
  name?: string;
  [key: string]: any;
}
interface FavouritesContextType {
  favourites: Movie[];
  addToFavourites: (movie: Movie) => void;
  removeFromFavourites: (movieId: string | number) => void;
  isFavourite: (movieId: string | number) => boolean;
}

interface FavouritesProviderProps {
  children: React.ReactNode;
}

const FavouritesContext = createContext<FavouritesContextType | null>(null);

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};

export const FavouritesProvider = ({ children }: FavouritesProviderProps) => {
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

  const value: FavouritesContextType = {
    addToFavourites,
    removeFromFavourites,
    isFavourite,
    favourites,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
