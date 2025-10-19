import { MdCancel } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateCartQuantity } from "../../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { removeItemFromCart, updateItemQuantity } from "../../services/cartApi";
import { useState } from "react";
import Modal from "../UI/Modal";

const Cart = () => {
  const [showForm, setShowForm] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const amountChangeHandler = async (event, productId) => {
    const newQuantity = parseInt(event.target.value) || 0;
    dispatch(updateCartQuantity({ id: productId, quantity: newQuantity }));
    if (user) {
      await updateItemQuantity(user.email, productId, newQuantity);
    } else {
      const localStorageCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedItem = localStorageCart.find(
        (item) => item.id === productId
      );
      updatedItem.quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(localStorageCart));
    }
  };

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

  const checkoutHandler = () => {
    setShowForm(true);
    if (user) {
      setShowForm(false);
      navigate("/home/cart/checkout");
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!cart || cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 my-auto mb-64 px-4">
        <IoCartOutline size={110} className="text-gray-500" />
        <span className="text-2xl md:text-4xl mt-4 text-center">
          You have no items in your shopping cart.
        </span>
        <Link
          to="/home"
          className="mt-6 py-3 px-8 border border-gray-500 rounded-sm hover:bg-red-500 hover:text-white transition duration-200"
        >
          Return To Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-24 mt-10">
      {/* Cart Items */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full border-separate border-spacing-y-4 ">
          <thead>
            <tr className="shadow-sm shadow-gray-400 text-left">
              <th className="pr-32 pl-10 py-4">Product</th>
              <th className="px-4 py-4">Price</th>
              <th className="px-4 py-4">Quantity</th>
              <th className="px-4 py-4">Subtotal</th>
            </tr>
          </thead>
          <tbody className="mt-8">
            {cart.map((product) => {
              let productImage;
              try {
                productImage = require(`../../assets/images/products/${product.image}`);
              } catch (error) {
                console.log("Image not found:", product.image);
                productImage = require("../../assets/images/placeholderImage.jpg");
              }
              return (
                <tr key={product.id} className="shadow-sm shadow-gray-400">
                  <td className="pl-4 py-4 gap-x-4 ">
                    <div className="relative flex items-center">
                      <button
                        className="absolute -top-2 -left-1 opacity-90"
                        onClick={deleteProductHandler.bind(null, product.id)}
                      >
                        <MdCancel className="text-red-500" />
                      </button>
                      <img
                        className="size-10 ml-2"
                        src={productImage}
                        alt={product.name}
                      />
                      <Link
                        to={`/home/${product.category}/${product.id}`}
                        className="ml-4"
                      >
                        {product.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2">
                    <input
                      className="w-16 p-1 rounded-md border border-gray-400 focus:outline-red-500"
                      type="number"
                      min={1}
                      max={99}
                      value={product.quantity}
                      onChange={(e) => amountChangeHandler(e, product.id)}
                      onBlur={(e) => {
                        if (e.target.value < 1) e.target.value = 1;
                        if (e.target.value > 99) e.target.value = 99;
                        amountChangeHandler(e, product.id);
                      }}
                    />
                  </td>
                  <td className="px-4 py-2">
                    ${(product.price * product.quantity).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Return to shop button */}
      <Link
        to="/home/all-products"
        className="mt-4 py-3 px-6 border border-gray-500 rounded-sm hover:bg-red-500 hover:text-white transition duration-300 inline-block"
      >
        Return To Shop
      </Link>

      {/* Coupon and Cart Total */}
      <div className="flex flex-col md:flex-row md:justify-between mt-8 space-y-6 md:space-y-0 mb-16">
        <div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="text"
              placeholder="Coupon Code"
              className="py-3 px-12 border border-gray-400 rounded-sm mb-2 md:mb-0"
            />
            <button className="text-white bg-red-500 py-3 px-9 rounded-md">
              Apply Coupon
            </button>
          </div>
        </div>

        <div className="border border-black p-4 rounded-sm shadow-md w-full md:w-96">
          <h2 className="font-medium text-lg">Cart Total</h2>
          <div className="flex justify-between mt-4">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2 border-t border-gray-400 pt-2">
            <span>Shipping:</span>
            {totalPrice > 140 && <span>Free</span>}
            {totalPrice === 0 && <span>0</span>}
            {totalPrice <= 140 && totalPrice !== 0 && <span>$15</span>}
          </div>
          <div className="flex justify-between mt-2 font-semibold border-t border-gray-400 pt-2">
            <span>Total:</span>
            {totalPrice > 140 && <span>{totalPrice.toFixed(2)}</span>}
            {totalPrice === 0 && <span>0</span>}
            {totalPrice <= 140 && totalPrice !== 0 && (
              <span>{(totalPrice + 15).toFixed(2)}</span>
            )}
          </div>
          <button
            className="w-full text-white bg-red-500 py-2 px-6 rounded-md mt-4"
            onClick={checkoutHandler}
          >
            Proceed to checkout
          </button>
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <Modal open={showForm} onClose={() => setShowForm(false)}>
          <div className="flex flex-col justify-center items-center gap-y-3">
            <span className="text-2xl font-medium">Sign in</span>
            <span>For Faster Checkout</span>
            <Link
              to="/login"
              className="text-white bg-red-500 py-3 px-12 rounded-md mt-4"
            >
              Log in
            </Link>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Cart;
