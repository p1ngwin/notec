import { FirebaseError } from "firebase/app";
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  AuthError,
  sendEmailVerification,
  updateProfile,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { auth } from "./useAuth";

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
  token?: string;
  error?: AuthError;
};

export const signInUserWithEmail = async (
  email: string,
  password: string
): Promise<AuthSignInReturnProps> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      getAuth(),
      email,
      password
    );

    const token = await userCredential.user.getIdToken();

    return { user: userCredential.user, token: token };
  } catch (error: any) {
    return { error: error };
  }
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

type UpdateUserProfileProps = {
  displayName?: string;
  photoURL?: string;
  password?: string;
};

export const updateUserProfile = async ({
  displayName,
  photoURL,
  password,
}: UpdateUserProfileProps): Promise<any> => {
  if (!displayName || displayName === "" || !auth.currentUser) {
    return;
  }

  const { email } = auth.currentUser;

  if (email) {
    try {
      if (password && password !== "") {
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(auth.currentUser, credential);
        await updatePassword(auth.currentUser, password);
      }
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
      return { message: "Successfully updated profile.", status: "ok" };
    } catch (error) {
      return error;
    }
  }
};

export const resetUserPassword = async (email: string): Promise<any> => {
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      return {
        message: "Password reset sucessfully sent. Please check your email",
        status: "ok",
      };
    })
    .catch((error) => {
      return { ...error };
    });
};
