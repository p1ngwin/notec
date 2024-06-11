import React, { useState } from "react";
import SidebarContext, { SidebarContextProps } from "./SidebarContext";

type Props = {
  children: React.ReactNode;
};

export const SidebarProvider: React.FC<Props> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const value: SidebarContextProps = {
    isDrawerOpen,
    toggleDrawer,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
