import { createContext } from "react";

export interface SidebarContextProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export default SidebarContext;
