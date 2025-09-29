import { Fragment } from "react/jsx-runtime";
import { FaComputer } from "react-icons/fa6";
import { IoShirt } from "react-icons/io5";
import { GiLargeDress } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import music from "../../assets/images/products/electronics/JBL Boombox2.png";

import { Link } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import { useEffect, useState } from "react";

const HomeContent = ({ products, duration }) => {
  const [time, setTime] = useState(duration);
  const product = products.find((product) => product.name === "JBL Boombox2");
  const totalSec = Math.floor(time / 1000);
  const totalMin = Math.floor(totalSec / 60);
  const totalHour = Math.floor(totalMin / 60);
  const days = Math.floor(totalHour / 24);
  const sec = totalSec % 60;
  const min = totalMin % 60;
  const hour = totalHour % 24;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1000) return duration; // reset
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <Fragment>
      {/* Categories */}
      <h2 className="border-l-[16px] border-red-500 pl-2 font-bold text-2xl text-red-500 mt-36 ml-16">
        Categories
      </h2>
      <h1 className="text-4xl font-medium ml-16 mt-5">Browser By Categories</h1>
      <div className="flex gap-8 mt-16 justify-center items-center">
        <Link
          to="/home/electronics"
          className="flex flex-col items-center border p-12 w-60 hover:bg-red-500 hover:text-white cursor-default rounded-md"
        >
          <FaComputer size={48} className="hover:text-white" />
          <span>Electronics</span>
        </Link>
        <Link
          to="/home/woman's-fashion"
          className="flex flex-col items-center border p-12 w-60 hover:bg-red-500 hover:text-white cursor-default rounded-md"
        >
          <GiLargeDress size={48} className="hover:text-white" />
          <span>Woman's Fashion</span>
        </Link>
        <Link
          to="/home/men's-fashion"
          className="flex flex-col items-center border p-12 w-60 hover:bg-red-500 hover:text-white cursor-default rounded-md"
        >
          <IoShirt size={48} className="hover:text-white" />
          <span>Men's Fashion</span>
        </Link>
        <Link
          to="/home/home-lifestyle"
          className="flex flex-col items-center border p-12 w-60 hover:bg-red-500 hover:text-white cursor-default rounded-md"
        >
          <FaHome size={48} className="hover:text-white" />
          <span>Home & Lifestyle</span>
        </Link>
      </div>

      {/* bos music banner */}
      <div className="flex justify-center items-center border border-black w-[80%] h-[450px] bg-black ml-40 mt-28">
        <div className="flex flex-col space-y-7 w-[500px]">
          <h2 className="text-green-400 flex items-center font-medium gap-2">
            Categories
          </h2>
          <h1 className="text-white text-6xl">Enhance Your Music Experience</h1>
          <div className="flex items-center justify-start space-x-4 ">
            <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center text-sm font-medium">
              {days} <span>Days</span>
            </div>
            <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center text-sm font-medium">
              {hour}
              <span>Hours</span>
            </div>
            <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center text-sm font-medium">
              {min}
              <span>Minutes</span>
            </div>
            <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center text-sm font-medium">
              {sec}
              <span>Seconds</span>
            </div>
          </div>
          <Link
            className="text-white bg-green-400 w-36 flex items-center justify-center py-3 rounded-md"
            to="/home/electronics/JBL-Boombox2"
          >
            Buy Now!
          </Link>
        </div>
        <div className="ml-[12%] w-1/3 h-5/6">
          <img
            className="w-full h-full object-contain"
            src={music}
            alt={product.name}
          />
        </div>
      </div>

      {/* random Products */}
      <div>
        <h2 className="border-l-[16px] border-red-500 pl-2 font-bold text-2xl text-red-500 mt-36 ml-16">
          Our Products
        </h2>
        <h1 className="text-4xl font-medium ml-16 mt-5">
          Explore Our Products
        </h1>
        <div className="grid grid-rows-2 grid-cols-4 ml-16 mt-16">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-12">
          <Link
            to="/home/all-products"
            className="text-white bg-red-500 py-3 px-8 rounded-sm"
          >
            View All Products
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeContent;
