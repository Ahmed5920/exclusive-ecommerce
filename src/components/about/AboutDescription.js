import { Fragment } from "react/jsx-runtime";
import aboutImage from "../../assets/images/aboutImage.png"
import sallersActiveIcon from "../../assets/icons/sallersActiveIcon.png";
import customerActiveIcon from "../../assets/icons/customerActiveIcon.png";
import annualGrossIcon from "../../assets/icons/annualGrossIcon.png";
import { FaDollarSign } from "react-icons/fa";

const AboutDescription = () => {
    const IconClass = "flex flex-col items-center border p-10 hover:bg-red-500 cursor-default rounded-md";
    return(
        <Fragment>
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 gap-16">
          <div className="ml-24 pt-12 max-w-xl">
            <h1 className="text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Launced in 2025, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by wide
              range of tailored marketing, data and service solutions, Exclusive
              has 10,500 sallers and 300 brands and serves 3 millioons customers
              across the region.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
          <img src={aboutImage} alt="aboutimage" />
      </div>

      <div className="flex p-40 gap-8 justify-center items-center">
        <button className={IconClass}>
          <img src={sallersActiveIcon} alt="Sales Icon"/>
          <span className="font-bold text-3xl">10.5K</span>
          <span>Sallers active our site</span>
        </button>
        <button className={IconClass}>
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
              <FaDollarSign className="text-white text-2xl" />
            </div>
          </div>
          <span className="font-bold text-3xl">33k</span>
          <span>Mopnthly Produduct Sale</span>
        </button>
        <button className={IconClass}>
          <img src={customerActiveIcon} alt="Customer Icon"/>
          <span className="font-bold text-3xl">45.5k</span>
          <span>Customer active in our site</span>
        </button>
        <button className={IconClass}>
          <img src={annualGrossIcon} alt="Annual Groos Icon"/>
          <span className="font-bold text-3xl">25k</span>
          <span>Anual gross sale in our site</span>
        </button>
      </div>
        </Fragment>
    )
}
export default AboutDescription;