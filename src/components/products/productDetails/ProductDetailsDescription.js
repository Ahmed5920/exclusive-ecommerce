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
  console.log(productAmout);
  const increaseHandler = () => {
    setProductAmout((prevState) => prevState + 1);
  };
  const decreaseHandler = () => {
    setProductAmout((prevState) => Math.max(1, prevState - 1));
  };
  const addItemToCartHandler = async () => {
    const productWithAmount = {
      ...product,
      quantity: productAmout,
    };
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
    <div className="ml-16 max-w-xl mr-16">
      <div className="space-y-3">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-xl mt-2">${product.price.toFixed(2)}</p>
        <p className="leading-relaxed max-w-4xl text-sm">
          {product.description}
        </p>
      </div>

      <div className="border-b border-gray-300 w-full mt-8 mb-8" />
      {(product.category === "men's-fashion" ||
        product.category === "woman's-fashion") && (
        <div>
          <span className="font-normal mr-4 text-lg">Size:</span>
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <button
              onClick={() => setSelectedSize(size)}
              key={size}
              disabled={!(product.category === "men's-fashion" || product.category === "woman's-fashion")}
              className={`py-1 border mx-2 w-8 rounded-md transition duration-300 ${
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

      <div className="flex items-center gap-16 mt-7">
        <div className="flex items-center border rounded-md ">
          <button
            className="px-3 py-2 text-xl hover:bg-red-500 transition ease-linear duration-300"
            onClick={decreaseHandler}
          >
            -
          </button>
          <span className="px-8 font-medium">{productAmout}</span>
          <button
            className="px-3 py-2 text-xl hover:bg-red-500 transition ease-linear duration-300"
            onClick={increaseHandler}
          >
            +
          </button>
        </div>
        <button
          className="bg-red-500 text-white px-16 py-3 rounded-lg hover:bg-red-600 transition"
          onClick={addItemToCartHandler}
        >
          Buy Now
        </button>
      </div>
      <div className="flex flex-col items-start mt-12 border border-black rounded-md w-[400px]">
        <button className="flex gap-4 p-6 ml-8 items-center cursor-auto">
          <FaShippingFast className="text-3xl font-light" />
          <div className="flex flex-col items-start text-left">
            <span className="font-medium">Free And Fast Delivery</span>
            <span className="text-sm">
              Free delivery for all orders over $140
            </span>
          </div>
        </button>
        <div className="border-b border-black w-full" />
        <button className="flex gap-4 p-6 items-center cursor-auto ml-8">
          <TfiReload className="text-3xl font-light" />
          <div className="flex flex-col items-start text-left">
            <span className="font-medium">Return Delivery</span>
            <span className="text-sm">free 30 Days Delivery Returns</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsDescription;
