import { Fragment } from "react/jsx-runtime";
import aboutImage from "../../assets/images/aboutImage.png";
import sallersActiveIcon from "../../assets/icons/sallersActiveIcon.png";
import customerActiveIcon from "../../assets/icons/customerActiveIcon.png";
import annualGrossIcon from "../../assets/icons/annualGrossIcon.png";
import { FaDollarSign } from "react-icons/fa";

const AboutDescription = () => {
  const IconClass =
    "flex flex-col items-center border p-10 hover:bg-red-500 cursor-default rounded-md";
  return (
    <Fragment>
      <div className="flex flex-col md:flex-row items-center justify-between pt-12 gap-16 max-md:px-6 max-md:text-center">
        <div className="ml-24 pt-12 max-w-xl max-md:m-0">
          <h1 className="text-5xl font-bold mb-6 max-md:text-3xl">Our Story</h1>
          <p className="text-gray-700 mb-4 leading-relaxed max-md:text-sm">
            Launced in 2025, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className="text-gray-700 leading-relaxed max-md:text-sm">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <img
          src={aboutImage}
          alt="aboutimage"
          className="max-w-full h-auto max-md:w-4/5 max-md:mt-8"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 p-40 md:p-32 gap-8 justify-center items-center max-md:p-6">
        <button className={IconClass + " max-md:p-4 max-md:w-36"}>
          <img
            src={sallersActiveIcon}
            alt="Sales Icon"
            className="max-md:w-12"
          />
          <span className="font-bold text-3xl max-md:text-xl">10.5K</span>
          <span className="max-md:text-xs">Sallers active our site</span>
        </button>
        <button className={IconClass + " max-md:p-4 max-md:w-36"}>
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center max-md:w-14 max-md:h-14">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center max-md:w-8 max-md:h-8">
              <FaDollarSign className="text-white text-2xl max-md:text-lg" />
            </div>
          </div>
          <span className="font-bold text-3xl max-md:text-xl">33k</span>
          <span className="max-md:text-xs">Monthly Product Sale</span>
        </button>
        <button className={IconClass + " max-md:p-4 max-md:w-36"}>
          <img
            src={customerActiveIcon}
            alt="Customer Icon"
            className="max-md:w-12"
          />
          <span className="font-bold text-3xl max-md:text-xl">45.5k</span>
          <span className="max-md:text-xs">Customer active in our site</span>
        </button>
        <button className={IconClass + " max-md:p-4 max-md:w-36"}>
          <img
            src={annualGrossIcon}
            alt="Annual Gross Icon"
            className="max-md:w-12"
          />
          <span className="font-bold text-3xl max-md:text-xl">25k</span>
          <span className="max-md:text-xs">Anual gross sale in our site</span>
        </button>
      </div>
    </Fragment>
  );
};

export default AboutDescription;
