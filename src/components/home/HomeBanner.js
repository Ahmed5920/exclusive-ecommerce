import { Link, NavLink } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { FaApple } from "react-icons/fa";
import { Fragment, useEffect, useState } from "react";

const HomeBanner = ({ banners }) => {
  const [activeBanner, setActiveBanner] = useState(0);

  const activeClass = "text-red-500 font-bold border-l-4 border-red-500 pl-2";
  const notactiveClass = "text-gray-700 hover:text-red-400 transition-colors";
  const validBanner = banners.filter((banner) => banner.isActive === true);
  const banner = validBanner[activeBanner];
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prevState) => (prevState + 1) % validBanner.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [validBanner.length]);
  return (
    <div className="flex">
      <div className="w-64 border-r-2 h-64">
        <ul className="space-y-2 ml-16 mt-12">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : notactiveClass
              }
              to="/home/all-products"
            >
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : notactiveClass
              }
              to="/home/woman's-fashion"
            >
              Woman's Fashion
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : notactiveClass
              }
              to="/home/men's-fashion"
            >
              Men's Fashion
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : notactiveClass
              }
              to="/home/electronics"
            >
              Electronics
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? activeClass : notactiveClass
              }
              to="/home/home-lifestyle"
            >
              Home & Lifestyle
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="w-full mt-8 ml-12">
        {banner && (
          <Fragment>
            <div
              className="flex items-center border border-black w-[90%] h-96 gap-16 relative"
              style={{ backgroundColor: banner.bgColor }}
            >
              <div className="flex flex-col space-y-7 ml-24 w-[352px]">
                <h2 className="text-white flex items-center gap-2">
                  {banner.title === "iPhone 16 Pro Max" && (
                    <FaApple className="text-4xl" />
                  )}
                  {banner.title}
                </h2>
                <h1 className="text-white text-6xl">{banner.subtitle}</h1>
                <Link
                  className="text-white underline underline-offset-8 flex items-center gap-2"
                  to={banner.ctaLink}
                >
                  {banner.ctaText}
                  <HiOutlineArrowRight className="mt-2 text-xl font-thin" />
                </Link>
              </div>
              <div className="ml-[12%] w-1/3 h-5/6">
                <img
                  className="w-full h-full object-cover"
                  src={banner.imageUrl}
                  alt={banner.title}
                />
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                {validBanner.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveBanner(index)}
                    className={`h-3 w-3 rounded-full ${
                      activeBanner === index
                        ? "bg-red-500 border border-gray-400"
                        : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default HomeBanner;
