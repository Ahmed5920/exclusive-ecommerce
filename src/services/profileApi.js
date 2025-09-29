// api.js
import { db, auth } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { updatePassword as firebaseUpdatePassword } from "firebase/auth";

/**
 * Update Firestore user profile.
 * Each user has only 1 document: use their email as doc id
 */
export const updateUserProfile = async (userEmail, data) => {
  try {
    const userRef = doc(db, "users", userEmail); // collection "users", doc = email
    await setDoc(userRef, data, { merge: true }); // merge: true → update if exists
    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error };
  }
};

/**
 * Update user password in Firebase Auth
 */
export const updateUserPassword = async (newPassword) => {
  try {
    if (!auth.currentUser) throw new Error("No logged in user.");
    await firebaseUpdatePassword(auth.currentUser, newPassword);
    return { success: true };
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, error };
  }
};