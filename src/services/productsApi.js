import { collection, getDocs, doc, getDoc, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export const getAllProducts = async () => {
  const productsCol = collection(db, "products");
  const categoryDocs = await getDocs(productsCol);

  let allProducts = [];

  for (const categoryDoc of categoryDocs.docs) {
    const itemsCol = collection(db, "products", categoryDoc.id, "items");
    const q = query(itemsCol, orderBy("price", "desc"));
    const itemsSnapshot = await getDocs(q);

    const products = itemsSnapshot.docs.map(item => ({
      id: item.id,
      ...item.data(),
    }));

    allProducts = [...allProducts, ...products];
  }

  return allProducts;
};

export const getProductsByCategory = async (category) => {
  const itemsCol = collection(db, "products", category, "items");
  const q = query(itemsCol, orderBy("price", "desc"));
  const itemsSnapshot = await getDocs(q);

  return itemsSnapshot.docs.map(item => ({
    id: item.id,
    ...item.data(),
  }));
};

export const getProductById = async (category, productId) => {
  const productRef = doc(db, "products", category, "items", productId);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) return null;

  return {
    id: productSnap.id,
    ...productSnap.data(),
  };
};

export const getAllBanners = async () => {
  const bannersCol = collection(db, "banners");
  const q = query(bannersCol, orderBy("order", "asc"));
  const bannersSnapshot = await getDocs(q);

  return bannersSnapshot.docs.map(item => ({
    id: item.id,
    ...item.data(),
  }));
};
