import { create } from "zustand";

interface searchStore {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const useSearchStore = create<searchStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
}));
