import { User } from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  isAuthenticated: boolean;
  user: User | null;
  token?: string | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      isLoading: true,
      error: null,
      _hasHydrated: false,
      setUser: (user) => {
        set({
          user: user,
        });
      },
      setIsLoading: (isLoading) => {
        set({ isLoading });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
