import { Link, NavLink } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi2";
import { FaApple } from "react-icons/fa";
import { Fragment, useEffect, useState } from "react";
import { categories } from "../../constants/categoryNames";

const HomeBanner = ({ banners }) => {
  const [activeBanner, setActiveBanner] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeClass = "text-red-500 font-bold border-l-4 border-red-500 pl-2";
  const notActiveClass ="text-gray-700 hover:text-red-400 transition-colors duration-200";
  const validBanner = banners.filter((banner) => banner.isActive === true);
  const banner = validBanner[activeBanner];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prevState) => (prevState + 1) % validBanner.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [validBanner.length]);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start">
      {/* Sidebar */}
      <div className="hidden md:block w-full md:w-64 border-r-0 md:border-r-2 md:h-64">
        <ul className="space-y-3 ml-4 mt-12">
          {categories.map((category) => (
            <li key={category.path}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? activeClass : notActiveClass
                }
                to={category.path}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:hidden w-full px-4 mt-4">
        <button
          className="bg-gray-200 px-4 py-2 rounded shadow w-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "Close Categories" : "Show Categories"}
        </button>
        {mobileMenuOpen && (
          <ul className="flex flex-col space-y-2 mt-2 bg-white p-4 rounded shadow w-full max-w-xs">
            {categories.map((cat) => (
              <li key={cat.path}>
                <NavLink
                  to={cat.path}
                  className={({ isActive }) =>
                    isActive ? activeClass : notActiveClass
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Banner Section */}
      <div className="w-full mt-8 md:ml-12 px-4 md:px-0">
        {banner && (
          <Fragment>
            <div
              className="flex flex-col md:flex-row items-center border border-black w-full md:w-[90%] md:h-96 gap-8 md:gap-16 relative overflow-hidden"
              style={{ backgroundColor: banner.bgColor }}
            >
              <div className="flex flex-col space-y-4 md:space-y-7 md:ml-24 w-full md:w-[352px] text-center md:text-left p-4">
                <h2 className="text-white flex items-center justify-center md:justify-start gap-2 text-xl md:text-2xl">
                  {banner.title === "iPhone 16 Pro Max" && (
                    <FaApple className="text-3xl md:text-4xl" />
                  )}
                  {banner.title}
                </h2>
                <h1 className="text-white text-4xl md:text-6xl">
                  {banner.subtitle}
                </h1>
                <Link
                  className="text-white underline underline-offset-8 flex justify-center md:justify-start items-center gap-2"
                  to={banner.ctaLink}
                >
                  {banner.ctaText}
                  <HiOutlineArrowRight className="mt-2 text-xl font-thin" />
                </Link>
              </div>
              <div className="md:ml-[12%] w-4/5 md:w-1/3 h-auto mb-2">
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