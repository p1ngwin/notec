import React, { PropsWithChildren, createContext } from "react";
import { initializeFirebase } from "./initFirebase";
import Login from "@/pages/login";
import useStore from "@/stores/useStore";
import { useUserStore } from "@/stores/useUserStore";

initializeFirebase();

interface AuthContextProps {
  user: string | null;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
});

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const user = useStore(useUserStore, (state) => state.user);

  if (!user) return <Login />;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
