import { useUserStore } from "@/stores/useUserStore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
export const registerUser = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(getAuth(), email, password).then(
    (user) => user.user,
    (error) => error
  );
};

export const signInUserWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(getAuth(), email, password).then(
    (user) => user.user,
    (error) => error
  );
};

export const getUser = () => {
  return getAuth().onAuthStateChanged((user) => {
    if (user) {
      console.log("The user is logged in", user);
      return user;
    } else {
      console.log("The user is not logged in", user);
      return null;
    }
  });
};

export const useAuthActions = () => {
  const setUser = useUserStore((state) => state.setUser);

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Successfully logged out");
      setUser(null); // Update the user state to null
    } catch (error) {
      console.log("Error signing out", error);
    }
  };

  return { handleSignOut };
};
