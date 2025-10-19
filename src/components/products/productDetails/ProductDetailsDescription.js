import { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../store/cartSlice";
import { addItemToCart } from "../../../services/cartApi";

const ProductDetailsDescription = ({ product }) => {
  const [productAmout, setProductAmout] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const increaseHandler = () => setProductAmout((p) => p + 1);
  const decreaseHandler = () => setProductAmout((p) => Math.max(1, p - 1));

  const addItemToCartHandler = async () => {
    const productWithAmount = { ...product, quantity: productAmout };
    dispatch(addItem(productWithAmount));

    if (user) {
      await addItemToCart(user.email, productWithAmount);
    } else {
      const localCart = [
        ...(JSON.parse(localStorage.getItem("cart")) || []),
        productWithAmount,
      ];
      localStorage.setItem("cart", JSON.stringify(localCart));
    }
  };

  return (
    <div className="ml-0 md:ml-16 max-w-full md:max-w-xl px-4 md:px-0 mt-6 md:mt-0">
      <div className="space-y-3">
        <h1 className="text-xl md:text-2xl font-medium">{product.name}</h1>
        <p className="text-lg md:text-xl mt-2">${product.price.toFixed(2)}</p>
        <p className="leading-relaxed text-sm md:text-base">
          {product.description}
        </p>
      </div>

      <div className="border-b border-gray-300 w-full mt-6 mb-6" />

      {(product.category === "men's-fashion" ||
        product.category === "woman's-fashion") && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-normal text-base md:text-lg">Size:</span>
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-1 border w-8 rounded-md transition duration-300 ${
                selectedSize === size
                  ? "bg-red-500 text-white"
                  : "hover:bg-red-100"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-16 mt-7">
        <div className="flex items-center border rounded-md">
          <button
            className="px-3 py-2 text-xl hover:bg-red-500 transition ease-linear duration-300"
            onClick={decreaseHandler}
          >
            -
          </button>
          <span className="px-6 md:px-8 font-medium">{productAmout}</span>
          <button
            className="px-3 py-2 text-xl hover:bg-red-500 transition ease-linear duration-300"
            onClick={increaseHandler}
          >
            +
          </button>
        </div>
        <button
          className="bg-red-500 text-white w-full sm:w-auto px-8 md:px-16 py-3 rounded-lg hover:bg-red-600 transition"
          onClick={addItemToCartHandler}
        >
          Buy Now
        </button>
      </div>

      <div className="flex flex-col mt-12 border border-black rounded-md w-full md:w-[400px]">
        <div className="flex gap-4 p-4 md:p-6 items-center">
          <FaShippingFast className="text-2xl md:text-3xl" />
          <div>
            <span className="font-medium block text-sm md:text-base">
              Free And Fast Delivery
            </span>
            <span className="text-xs md:text-sm">
              Free delivery for all orders over $140
            </span>
          </div>
        </div>
        <div className="border-b border-black w-full" />
        <div className="flex gap-4 p-4 md:p-6 items-center">
          <TfiReload className="text-2xl md:text-3xl" />
          <div>
            <span className="font-medium block text-sm md:text-base">
              Return Delivery
            </span>
            <span className="text-xs md:text-sm">
              Free 30 Days Delivery Returns
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsDescription;
