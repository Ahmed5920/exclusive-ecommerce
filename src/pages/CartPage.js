import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import Cart from "../components/Cart/Cart";

const CartPage = () => {
    return(
        <Fragment>
            <div className="ml-24 space-x-3 mt-16 text-gray-400">
                <Link to="/home">Home</Link>
                <span>/</span>
                <span className="text-black">Cart</span>
            </div>
            <Cart/>
        </Fragment>
    )
}

export default CartPage;