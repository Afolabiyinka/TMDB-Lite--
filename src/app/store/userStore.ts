import { create } from "zustand";
import type { User } from "../types/User";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: (() => {
    const storedUser = localStorage.getItem("TmdbUser");
    return storedUser ? (JSON.parse(storedUser) as User) : null;
  })(),

  setUser: (user: User | null) => set({ user }),
}));
