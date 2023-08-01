import { fetchData } from "@/utils/api/fetch";
import { create } from "zustand";

interface LoadingStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  fetch: (url: string, query?: URLSearchParams) => Promise<any>;
  error?: unknown | null;
}

export const useFetchStore = create<LoadingStore>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => {
    set({ isLoading });
  },
  fetch: async (url) => {
    try {
      set({ isLoading: true });
      const result = await fetchData(url);
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({ isLoading: false, error });
    }
  },
}));
