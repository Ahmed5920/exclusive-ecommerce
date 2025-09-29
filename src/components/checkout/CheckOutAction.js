import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, removeItemFromCart } from "../../services/cartApi";
import { Link } from "react-router-dom";
import visaCard from "../../assets/icons/visa.png";
import { MdCancel } from "react-icons/md";
import { Fragment, useState } from "react";
import { removeItem, replaceCart } from "../../store/cartSlice";
import Notification from "../UI/Notification";

const CheckOutAction = () => {
    const [paymentMethod, setPaymentMethod] = useState("bank");
    const [showNotify, setShowNotify] = useState(false);
    const cart = useSelector((state) => state.cart.cart);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const deleteProductHandler = async (id) => {
        dispatch(removeItem(id));
        if (user) {
            await removeItemFromCart(user.email, id);
        } else {
            const localStorageCart = JSON.parse(localStorage.getItem("cart")) || [];
            const updatedCart = localStorageCart.filter((item) => item.id !== id);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
  };
  const placeOrderHandler = async () => {
    if (paymentMethod === "bank") {
        // add Visa Api
        setShowNotify(true);
    }
    if (paymentMethod === "cash") {
        setShowNotify(true);
    }
    await clearCart(user.email);
    const userCart = await getCart(user.email);
    dispatch(replaceCart(userCart));
};

  return (
    <Fragment>
      <div className="ml-56 mt-24 w-[560px] p-4">
        {cart.map((product) => {
          let productImage;
          try {
            productImage = require(`../../assets/images/products/${product.image}`);
          } catch (error) {
            console.log("Image not found:", product.image);
            productImage = require("../../assets/images/placeholderImage.jpg");
          }
          return (
            <div
              className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 py-4"
              key={product.id}
            >
              <div className="relative flex items-center">
                <button
                  className="absolute -top-2 -left-2 opacity-90"
                  onClick={deleteProductHandler.bind(null, product.id)}
                >
                  <MdCancel className="text-red-500" />
                </button>
                <img
                  className="size-10"
                  src={productImage}
                  alt={product.name}
                />
              </div>
              <Link
                to={`/home/${product.category}/${product.id}`}
                className="text-gray-800 w-72"
              >
                {product.name}
              </Link>

              <span className="text-right font-medium">${product.price}</span>
            </div>
          );
        })}
        <div className="mt-8 space-y-5">
          <div className="flex justify-between mb-4 mt-4">
            <span>Subtotal: </span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 order-t pt-2 border-t border-black">
            <span>Shipping: </span>
            {totalPrice > 140 && <span>Free</span>}
            {totalPrice === 0 && <span>0</span>}
            {totalPrice <= 140 && totalPrice !== 0 && <span>$15</span>}
          </div>
          <div className="flex justify-between mb-4 font-semibold mt-4 border-t border-black pt-2">
            <span>Total: </span>
            {totalPrice > 140 && <span>{totalPrice.toFixed(2)}</span>}
            {totalPrice === 0 && <span>0</span>}
            {totalPrice <= 140 && totalPrice !== 0 && (
              <span>{(totalPrice + 15).toFixed(2)}</span>
            )}
          </div>
        </div>
        <div className="mt-6">
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 accent-black"
            />
            <span>Bank</span>
            <img src={visaCard} alt="Visa" className="size-10 ml-40" />
          </label>
          <label className="flex items-center gap-4 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-5 h-5 accent-black"
            />
            <span>Cash on delivery</span>
          </label>
          <button
            className="text-white bg-red-500 py-3 px-9 rounded-md mt-6 focus:bg-red-700 transition duration-200"
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
        </div>
      </div>
      {showNotify && (
        <Notification
          message="Your order has been placed successfully!"
          onClose={() => setShowNotify(false)}
        />
      )}
    </Fragment>
  );
};

export default CheckOutAction;
