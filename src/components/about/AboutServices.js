import { Fragment } from "react/jsx-runtime";
import cusomterService from "../../assets/icons/customerService.png";
import fastDelivery from "../../assets/icons/delivery.png";
import protect from "../../assets/icons/protect.png";

const AboutServices = () => {
  return (
    <Fragment>
      <div className="flex p-44 justify-center items-center gap-24">
        <button className="flex flex-col items-center cursor-default rounded-md">
          <img src={fastDelivery} alt="fast Delivery Icon" />
          <span className="font-bold text-xl">FREE AND FAST DELIVERY</span>
          <span>Free delivery for all orders over $140</span>
        </button>
        <button className="flex flex-col items-center cursor-default rounded-md">
          <img src={cusomterService} alt="cusomter Service Icon" />
          <span className="font-bold text-xl">24/7 CUSTOMER SERVICE</span>
          <span>Friendly 24/7 customer support</span>
        </button>
        <button className="flex flex-col items-center cursor-default rounded-md">
          <img src={protect} alt="protect Icon" />
          <span className="font-bold text-xl">MONEY BACK GUARANTEE</span>
          <span>We return money within 30 days</span>
        </button>
      </div>
    </Fragment>
  );
};

export default AboutServices;
