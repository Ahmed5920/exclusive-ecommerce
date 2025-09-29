import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AllProductPage from "./pages/productsPage/AllproductsPage";
import ProductLayout from "./components/products/ProductLayout";
import CategoryPage from "../src/pages/productsPage/CategoryPage";
import ProductDetailsPage from "./pages/productsPage/ProductDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import CartPage from "./pages/CartPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "./services/firebase";
import { logOut, setUser } from "./store/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { getCart } from "./services/cartApi";
import { replaceCart } from "./store/cartSlice";
import CheckOutPage from "./pages/CheckOutPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import MyAccount from "./pages/MyAccount";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
        try {
          const userCart = await getCart(user.email);
          dispatch(replaceCart(userCart));
        } catch (error) {
          console.warn("No cart found in Firestore, using empty cart");
        }
      } else {
        dispatch(logOut());
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        dispatch(replaceCart(localCart));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignupPage />} />

        <Route path="/home">
          <Route index element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="not-Found" element={<NotFoundPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route
            path="my-account"
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="cart/checkout"
            element={
              <ProtectedRoute>
                <CheckOutPage />
              </ProtectedRoute>
            }
          />

          <Route element={<ProductLayout />}>
            <Route path="all-products" element={<AllProductPage />} />
            <Route path=":category" element={<CategoryPage />} />
          </Route>
          <Route
            path="all-products/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path=":category/:productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
