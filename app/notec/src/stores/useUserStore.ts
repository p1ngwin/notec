import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  isAuthenticated: boolean;
  user: string | null;
  token?: string | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: string | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      isLoading: false,
      error: null,
      setUser: (user) => {
        set({ isLoading: false, user: user });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
