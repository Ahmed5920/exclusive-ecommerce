import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItem } from "../../store/cartSlice";
import { addItemToCart } from "../../services/cartApi";

const ProductCard = ({ product }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let productImage;
  try {
    productImage = require(`../../assets/images/products/${product.image}`);
  } catch (error) {
    console.log("Image not Found", product.image);
    productImage = require("../../assets/images/placeholderImage.jpg");
  }

  const addToCartHandler = async (id) => {
    const productWithAmount = { ...product, quantity: 1 };
    dispatch(addItem(productWithAmount));

    if (user) {
      await addItemToCart(user.email, productWithAmount);
    } else {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItem = localCart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
        localStorage.setItem("cart", JSON.stringify(localCart));
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([...localCart, productWithAmount])
        );
      }
    }

    navigate("/home/cart");
  };

  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="relative bg-gray-200 rounded-xl shadow-sm group h-72 md:w-80 md:h-72 w-full max-w-xs">
        <Link
          className="flex justify-center items-center w-full h-full"
          to={`/home/${product.category}/${product.id}`}
        >
          <img
            src={productImage}
            alt={product.name}
            className="max-w-full max-h-full object-contain py-12 px-4 mb-8 md:mb-0 cursor-pointer md:group-hover:mb-6 transition duration-500"
          />
        </Link>
        <button
          className="absolute flex justify-center items-center md:opacity-0 gap-2 text-white bg-black w-full md:w-80 h-12  md:h-0 bottom-0 pointer-events-none md:group-hover:h-12 md:group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-500 focus:bg-red-500 focus:duration-200"
          onClick={addToCartHandler.bind(null, product.id)}
        >
          <IoCartOutline className="text-white text-xl" />
          Add To Cart
        </button>
      </div>

      <h2 className="mt-3 font-medium text-black w-full md:w-80 truncate text-center md:text-left">
        {product.name}
      </h2>
      <p className="text-red-500 text-sm font-semibold w-full md:w-80 text-center md:text-left">
        ${product.price}
      </p>
    </div>
  );
};

export default ProductCard;
