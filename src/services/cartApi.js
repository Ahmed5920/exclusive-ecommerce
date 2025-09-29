import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// ✅ 1. Get User Cart from Firestore
export const getCart = async (userEmail) => {
  const cartRef = doc(db, "carts", userEmail);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    return cartSnap.data().items || [];
  } else {
    return []; // empty cart if not exist
  }
};

// ✅ 2. Overwrite Entire Cart
export const overwriteCart = async (userEmail, items) => {
  const cartRef = doc(db, "carts", userEmail);
  await setDoc(cartRef, { items });
};

// ✅ 3. Merge Local Cart with Firestore Cart
export const mergeCart = async (userEmail) => {
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];
  const serverCart = await getCart(userEmail);

  const mergedCart = [...serverCart];

  localCart.forEach((localItem) => {
    const existingIndex = mergedCart.findIndex(item => item.id === localItem.id);
    if (existingIndex !== -1) {
      mergedCart[existingIndex] = {
        ...mergedCart[existingIndex],
        quantity: mergedCart[existingIndex].quantity + localItem.quantity
      };
    } else {
      mergedCart.push(localItem);
    }
  });

  await overwriteCart(userEmail, mergedCart);
  localStorage.removeItem("cart");
  return mergedCart;
};

// ✅ 4. Add New Item to Cart
export const addItemToCart = async (userEmail, newItem) => {
  const cartRef = doc(db, "carts", userEmail);
  const cartSnap = await getDoc(cartRef);

  let updatedItems = [];

  if (cartSnap.exists()) {
    const existingItems = cartSnap.data().items || [];

    const itemIndex = existingItems.findIndex(item => item.id === newItem.id);

    if (itemIndex !== -1) {
      updatedItems = [...existingItems];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        quantity: updatedItems[itemIndex].quantity + newItem.quantity,
      };
    } else {
      updatedItems = [...existingItems, newItem];
    }

    await updateDoc(cartRef, { items: updatedItems });
  } else {
    updatedItems = [newItem];
    await setDoc(cartRef, { items: updatedItems });
  }

  return updatedItems;
};

// ✅ 5. Remove Item from Cart
export const removeItemFromCart = async (userEmail, productId) => {
  const cartRef = doc(db, "carts", userEmail);
  const cartSnap = await getDoc(cartRef);

  if (!cartSnap.exists()) return [];

  const existingItems = cartSnap.data().items || [];
  const updatedItems = existingItems.filter(item => item.id !== productId);

  await updateDoc(cartRef, { items: updatedItems });
  return updatedItems;
};

// ✅ 6. Update Quantity
export const updateItemQuantity = async (userEmail, productId, newQuantity) => {
  const cartRef = doc(db, "carts", userEmail);
  const cartSnap = await getDoc(cartRef);

  if (!cartSnap.exists()) return [];

  const existingItems = cartSnap.data().items || [];

  const updatedItems = existingItems
    .map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ) 

  await updateDoc(cartRef, { items: updatedItems });
  return updatedItems;
};

export const clearCart = async (userEmail) => {
  const cartRef = doc(db, "carts", userEmail);
  await setDoc(cartRef, { items: [] }); // just overwrite with empty array
  return []; // return empty cart
};
