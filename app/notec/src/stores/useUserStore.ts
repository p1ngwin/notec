import { User } from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  isAuthenticated: boolean;
  user: User | null;
  token?: string;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setToken: (token?: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: undefined,
      user: null,
      isLoading: true,
      error: null,
      setUser: (user) => {
        set({
          user: user,
        });
      },
      setIsLoading: (isLoading) => {
        set({ isLoading });
      },
      setToken: (token) => {
        set({ token });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
