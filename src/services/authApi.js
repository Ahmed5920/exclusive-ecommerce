import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

export const signupUser = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });

  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    displayName: name,
  };
};

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
    displayName: userCredential.user.displayName,
  };
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    // Optional: update Firestore user document here if you want to store profile info

    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
    };
  } catch (error) {
    console.error("Google login error:", error);
    return { error };
  }
};
