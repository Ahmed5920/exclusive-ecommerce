import { Fragment } from "react/jsx-runtime";
import cusomterService from "../../assets/icons/customerService.png";
import fastDelivery from "../../assets/icons/delivery.png";
import protect from "../../assets/icons/protect.png";

const AboutServices = () => {
  return (
    <Fragment>
      <div className="flex p-44 justify-center items-center gap-24 max-md:flex-col max-md:p-8 max-md:gap-10 text-center">
        <button className="flex flex-col items-center cursor-default rounded-md">
          <img src={fastDelivery} alt="fast Delivery Icon" className="max-md:w-20" />
          <span className="font-bold text-xl max-md:text-lg mt-2">
            FREE AND FAST DELIVERY
          </span>
          <span className="max-md:text-sm">Free delivery for all orders over $140</span>
        </button>
        <button className="flex flex-col items-center cursor-default rounded-md">
          <img src={cusomterService} alt="cusomter Service Icon" className="max-md:w-20" />
          <span className="font-bold text-xl max-md:text-lg mt-2">
            24/7 CUSTOMER SERVICE
          </span>
          <span className="max-md:text-sm">Friendly 24/7 customer support</span>
        </button>
        <button className="flex flex-col items-center cursor-default rounded-md">
          <img src={protect} alt="protect Icon" className="max-md:w-20" />
          <span className="font-bold text-xl max-md:text-lg mt-2">
            MONEY BACK GUARANTEE
          </span>
          <span className="max-md:text-sm">We return money within 30 days</span>
        </button>
      </div>
    </Fragment>
  );
};

export default AboutServices;
