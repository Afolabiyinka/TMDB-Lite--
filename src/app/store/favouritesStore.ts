import { create } from "zustand";
import type { MovieType } from "../types/movie";

interface favouritesStore {
  favourites: MovieType[];
  addToFavourites: (movie: MovieType) => void;
  removeFromFavourites: (movieId: string | number) => void;
  isFavourite: (id: string | number) => boolean;
}

export const useFavouritesStore = create<favouritesStore>((set, get) => ({
  favourites: (() => {
    const storedFav = localStorage.getItem("favourites");
    return storedFav ? (JSON.parse(storedFav) as MovieType[]) : [];
  })(),
  addToFavourites: (movie) =>
    set((current) => {
      const updated = [...current.favourites, movie];
      localStorage.setItem("favourites", JSON.stringify(updated));
      return { favourites: updated };
    }),
  removeFromFavourites: (id) =>
    set((state) => {
      const updated = state.favourites.filter((fav) => fav.id !== id);
      localStorage.setItem("favourites", JSON.stringify(updated));
      return { favourites: updated };
    }),
  isFavourite: (id) => {
    return get().favourites.some((fav) => fav.id === id);
  },
}));
