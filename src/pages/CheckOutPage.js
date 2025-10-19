import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import CheckOutForm from "../components/checkout/CheckOutForm";
import CheckOutAction from "../components/checkout/CheckOutAction";

const CheckOutPage = () => {
  return (
    <Fragment>
      <div className="ml-4 md:ml-24 space-x-3 mt-8 md:mt-16 text-gray-400 text-sm md:text-base">
        <Link to="/home">Home</Link>
        <span>/</span>
        <Link to="/home/cart">Cart</Link>
        <span>/</span>
        <span className="text-black">CheckOut</span>
      </div>

      <div className="flex flex-col md:flex-row mt-8 md:mt-16 mb-24 mx-4 md:ml-24 gap-10">
        <CheckOutForm />
        <CheckOutAction />
      </div>
    </Fragment>
  );
};

export default CheckOutPage;
