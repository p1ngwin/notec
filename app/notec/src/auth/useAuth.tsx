import React, { PropsWithChildren, createContext, useEffect } from "react";
import { User, getAuth } from "firebase/auth";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/router";
import Register from "@/pages/register";
import { firebaseConfig } from "./initFirebase";
import { initializeApp } from "firebase/app";

interface AuthContextProps {
  user: User | null;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
});

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const setIsLoading = useUserStore((state) => state.setIsLoading);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      useUserStore.setState({ user });
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setIsLoading]);

  if (router.pathname === "/register") return <Register />;

  return (
    <>
      <AuthContext.Provider value={{ user: user || null }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
