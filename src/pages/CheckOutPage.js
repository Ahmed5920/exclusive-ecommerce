import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import CheckOutForm from "../components/checkout/CheckOutForm";
import CheckOutAction from "../components/checkout/CheckOutAction";

const CheckOutPage = () => {
    return(
        <Fragment>
             <div className="ml-24 space-x-3 mt-16 text-gray-400">
                <Link to="/home">Home</Link>
                <span>/</span>
                <Link to="/home/cart">Cart</Link>
                <span>/</span>
                <span className="text-black">CheckOut</span>
            </div>
            ,<div className="flex mt-16 ml-24 mb-24">
                <CheckOutForm/>
                <CheckOutAction/>
            </div>
        </Fragment>
    )
}

export default CheckOutPage;