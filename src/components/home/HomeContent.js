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
      setTime((prevTime) => (prevTime <= 1000 ? duration : prevTime - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [duration]);

  return (
    <Fragment>
      {/* Categories */}
      <h2 className="border-l-[12px] md:border-l-[16px] border-red-500 pl-2 font-bold text-xl md:text-2xl text-red-500 mt-16 md:mt-36 ml-6 md:ml-16">
        Categories
      </h2>
      <h1 className="text-3xl md:text-4xl font-medium ml-6 md:ml-16 mt-3 md:mt-5">
        Browse By Categories
      </h1>
      <div className="flex flex-wrap gap-4 md:gap-8 mt-8 md:mt-16 justify-center items-center px-4">
        {[
          { to: "/home/electronics", icon: FaComputer, label: "Electronics" },
          { to: "/home/woman's-fashion", icon: GiLargeDress, label: "Woman's Fashion" },
          { to: "/home/men's-fashion", icon: IoShirt, label: "Men's Fashion" },
          { to: "/home/home-lifestyle", icon: FaHome, label: "Home & Lifestyle" },
        ].map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center border p-8 md:p-12 w-36 md:w-60 hover:bg-red-500 h-[137.6px] md:h-full hover:text-white cursor-default rounded-md text-center"
          >
            <Icon className="hover:text-white size-8 md:size-12" />
            <span className="text-sm md:text-base">{label}</span>
          </Link>
        ))}
      </div>

      {/* Music banner */}
      <div className="flex flex-col md:flex-row justify-center items-center border border-black w-[90%] md:w-[80%] mx-auto h-auto md:h-[450px] bg-black mt-16 md:mt-28 p-6 md:p-0 text-center md:text-left">
        <div className="flex flex-col space-y-4 md:space-y-7 w-full md:w-[500px]">
          <h2 className="text-green-400 font-medium">Categories</h2>
          <h1 className="text-white text-3xl md:text-6xl">Enhance Your Music Experience</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 md:space-x-4">
            {[{v: days, l: "Days"}, {v: hour, l: "Hours"}, {v: min, l: "Minutes"}, {v: sec, l: "Seconds"}].map(({v,l}) => (
              <div key={l} className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex flex-col items-center justify-center text-xs md:text-sm font-medium">
                {v} <span>{l}</span>
              </div>
            ))}
          </div>
          <Link
            className="text-white bg-green-400 w-32 md:w-36 mx-auto md:mx-0 flex items-center justify-center py-2 md:py-3 rounded-md"
            to="/home/electronics/JBL-Boombox2"
          >
            Buy Now!
          </Link>
        </div>
        <div className="mt-8 md:mt-0 md:ml-[12%] w-3/4 md:w-1/3">
          <img className="w-full h-full object-contain" src={music} alt={product?.name} />
        </div>
      </div>

      {/* Random Products */}
      <div className="mt-16 md:mt-36 px-4 md:px-0">
        <h2 className="border-l-[12px] md:border-l-[16px] border-red-500 pl-2 font-bold text-xl md:text-2xl text-red-500 ml-2 md:ml-16">
          Our Products
        </h2>
        <h1 className="text-3xl md:text-4xl font-medium ml-2 md:ml-16 mt-3 md:mt-5">
          Explore Our Products
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 mb-12 md:ml-16 md:mt-12 min-h-[400px]">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center items-center mt-12">
          <Link
            to="/home/all-products"
            className="text-white bg-red-500 py-2 px-6 md:py-3 md:px-8 rounded-sm"
          >
            View All Products
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default HomeContent;

// import { Fragment } from "react/jsx-runtime";
// import { FaComputer } from "react-icons/fa6";
// import { IoShirt } from "react-icons/io5";
// import { GiLargeDress } from "react-icons/gi";
// import { FaHome } from "react-icons/fa";
// import music from "../../assets/images/products/electronics/JBL Boombox2.png";

// import { Link } from "react-router-dom";
// import ProductCard from "../products/ProductCard";
// import { useEffect, useState } from "react";

// const HomeContent = ({ products, duration }) => {
//   const [time, setTime] = useState(duration);
//   const product = products.find((product) => product.name === "JBL Boombox2");
//   const totalSec = Math.floor(time / 1000);
//   const totalMin = Math.floor(totalSec / 60);
//   const totalHour = Math.floor(totalMin / 60);
//   const days = Math.floor(totalHour / 24);
//   const sec = totalSec % 60;
//   const min = totalMin % 60;
//   const hour = totalHour % 24;

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime((prevTime) => {
//         if (prevTime <= 1000) return duration; // reset
//         return prevTime - 1000;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [duration]);

//   return (
//     <Fragment>
//       {/* Categories */}
//       <h2 className="border-l-[16px] border-red-500 pl-2 font-bold text-2xl text-red-500 mt-36 ml-16">
//         Categories
//       </h2>
//       <h1 className="text-4xl font-medium ml-16 mt-5">Browser By Categories</h1>
//       <div className="flex gap-8 mt-16 justify-center items-center">
//         <Link
//           to="/home/electronics"
//           className="flex flex-col items-center border p-12 w-60 hover:bg-red-500 hover:text-white cursor-default rounded-md"
//         >
//           <FaComputer size={48} className="hover:text-white" />
//           <span>Electronics</span>
//         </Link>
//         <Link
//           to="/home/woman's-fashion"
//           className="flex flex-col items-center border p-12 w-60 hover:bg-red-500 hover:text-white cursor-default rounded-md"
//         >
//           <GiLargeDress size={48} className="hover:text-white" />
//           <span>Woman's Fashion</span>
//         </Link>
//         <Link
//           to="/home/men's-fashion"
//           className="flex flex-col items-center border p-12 w-60 hover:bg-red-500 hover:text-white cursor-default rounded-md"
//         >
//           <IoShirt size={48} className="hover:text-white" />
//           <span>Men's Fashion</span>
//         </Link>
//         <Link
//           to="/home/home-lifestyle"
//           className="flex flex-col items-center border p-12 w-60 hover:bg-red-500 hover:text-white cursor-default rounded-md"
//         >
//           <FaHome size={48} className="hover:text-white" />
//           <span>Home & Lifestyle</span>
//         </Link>
//       </div>

//       {/* bos music banner */}
//       <div className="flex justify-center items-center border border-black w-[80%] h-[450px] bg-black ml-40 mt-28">
//         <div className="flex flex-col space-y-7 w-[500px]">
//           <h2 className="text-green-400 flex items-center font-medium gap-2">
//             Categories
//           </h2>
//           <h1 className="text-white text-6xl">Enhance Your Music Experience</h1>
//           <div className="flex items-center justify-start space-x-4 ">
//             <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center text-sm font-medium">
//               {days} <span>Days</span>
//             </div>
//             <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center text-sm font-medium">
//               {hour}
//               <span>Hours</span>
//             </div>
//             <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center text-sm font-medium">
//               {min}
//               <span>Minutes</span>
//             </div>
//             <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center text-sm font-medium">
//               {sec}
//               <span>Seconds</span>
//             </div>
//           </div>
//           <Link
//             className="text-white bg-green-400 w-36 flex items-center justify-center py-3 rounded-md"
//             to="/home/electronics/JBL-Boombox2"
//           >
//             Buy Now!
//           </Link>
//         </div>
//         <div className="ml-[12%] w-1/3 h-5/6">
//           <img
//             className="w-full h-full object-contain"
//             src={music}
//             alt={product.name}
//           />
//         </div>
//       </div>

//       {/* random Products */}
//       <div>
//         <h2 className="border-l-[16px] border-red-500 pl-2 font-bold text-2xl text-red-500 mt-36 ml-16">
//           Our Products
//         </h2>
//         <h1 className="text-4xl font-medium ml-16 mt-5">
//           Explore Our Products
//         </h1>
//         <div className="grid grid-rows-2 grid-cols-4 ml-16 mt-16">
//           {products.slice(0, 8).map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//         <div className="flex justify-center items-center mt-12">
//           <Link
//             to="/home/all-products"
//             className="text-white bg-red-500 py-3 px-8 rounded-sm"
//           >
//             View All Products
//           </Link>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default HomeContent;
