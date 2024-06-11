import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LayoutStore {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  setIsMobile: () => void;
  setIsTablet: () => void;
  setIsDesktop: () => void;
}

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set) => ({
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      setIsMobile: () => {
        set({ isMobile: true, isTablet: false, isDesktop: false });
      },
      setIsTablet: () => {
        set({ isTablet: true, isMobile: false, isDesktop: false });
      },
      setIsDesktop: () => {
        set({ isDesktop: true, isMobile: false, isTablet: false });
      },
    }),
    {
      name: "layout-storage",
    }
  )
);
