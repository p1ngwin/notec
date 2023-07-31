import { FirebaseError } from "firebase/app";
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  AuthError,
  sendEmailVerification,
} from "firebase/auth";
import toast from "react-hot-toast";

type AuthRegisterResponse = {
  user?: User;
  error?: FirebaseError;
};

export const registerUser = async (
  email: string,
  password: string
): Promise<AuthRegisterResponse> => {
  try {
    const user = await createUserWithEmailAndPassword(
      getAuth(),
      email,
      password
    );
    sendEmailVerification(user.user);
    return { user: user.user };
  } catch (error) {
    return { error: error as FirebaseError };
  }
};

type AuthSignInReturnProps = {
  user?: User;
  error?: AuthError;
};

export const signInUserWithEmail = async (
  email: string,
  password: string
): Promise<AuthSignInReturnProps> => {
  return signInWithEmailAndPassword(getAuth(), email, password)
    .then((user) => {
      return { user: user.user };
    })
    .catch((error: AuthError) => {
      return { error: error };
    });
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
  //const setUser = useUserStore((state) => state.setUser);

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Successfully logged out");
      //setUser(null); // Update the user state to null
    } catch (error) {
      console.log("Error signing out", error);
    }
  };

  return { handleSignOut };
};

export const sendEmailVerificationToUser = async (user: User | null) => {
  if (!user) return { message: { status: "error", code: "user not found" } };

  toast.loading("Sending verification email...", { id: "loading" });

  await sendEmailVerification(user);

  toast.dismiss("loading");

  toast.success("Email verificaiton sent, check your email.");

  return { message: { status: "ok", code: "verification_code_sent" } };
};
