import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItem } from "../../store/cartSlice";
import { addItemToCart } from "../../services/cartApi";
const ProductCard = ({ product }) => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  let productImage;
  try {
    productImage = require(`../../assets/images/products/${product.image}`);
  } catch (error) {
    console.log("Image not Found", product.image);
    productImage = require("../../assets/images/placeholderImage.jpg");
  }

  const addToCartHandler = async(id) => {
    const productWithAmount = {
          ...product,
          quantity:1
        }
        dispatch(addItem(productWithAmount))
        if(user){
          await addItemToCart(user.email, productWithAmount);
        }
        else{
          const localCart = (JSON.parse(localStorage.getItem("cart")) || []);
          const existingItem = localCart.find((item) => item.id === id)
          if(existingItem){
            existingItem.quantity++;
            localStorage.setItem("cart",JSON.stringify(localCart))
          }
          else{
            const updatedCart = [...localCart,productWithAmount]
            localStorage.setItem("cart", JSON.stringify(updatedCart))
          }
        }
        navigate("/home/cart");
  }
  return (
    <div>
      <div className="relative bg-gray-200 w-80 h-72 rounded-xl shadow-sm group">
        <Link
          className="flex justify-center items-center w-full h-full"
          to={`/home/${product.category}/${product.id}`}
        >
          <img
            src={productImage}
            alt={product.name}
            className="max-w-full max-h-full object-contain py-12 px-4 cursor-pointer group-hover:mb-6 transitio duration-500"
          />
        </Link>
        <button
          className="absolute flex justify-center items-center opacity-0 gap-2 text-white bg-black w-80 h-0 bottom-0 pointer-events-none group-hover:h-12 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-500 focus:bg-red-500 focus:duration-200"
          onClick={addToCartHandler.bind(null,product.id)}
        >
          <IoCartOutline className="text-white text-xl" />
          Add To Cart
        </button>
      </div>

      <h2 className="mt-3 font-medium text-black w-80">{product.name}</h2>
      <p className="text-red-500 text-sm font-semibold">${product.price}</p>
    </div>
  );
};

export default ProductCard;
