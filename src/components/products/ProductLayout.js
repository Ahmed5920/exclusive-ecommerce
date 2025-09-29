import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime"
import { categoryNames } from "../../constants/categoryNames";

const ProductLayout = () => {
    const param = useParams();
    const category = param.category;
    const activeClass = "text-red-500 font-bold border-l-4 border-red-500 pl-2";
    const notactiveClass = "text-gray-700 hover:text-red-400 transition-colors";
    let header;
    const location =useLocation();
    if(location.pathname === "/home/all-products"){
        header = "All Prdocuts";
    }else{
        header = categoryNames[category] || category;
    }
    return(
        <Fragment>
            <div className="flex">
                <div className="w-64 border-r-2">
                    <ul className="space-y-2 ml-16 mt-12">
                        <li>
                            <NavLink className={({isActive}) => (isActive? activeClass : notactiveClass)} to="/home/all-products">All Products</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => (isActive? activeClass : notactiveClass)} to="/home/woman's-fashion">Woman's Fashion</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => (isActive? activeClass : notactiveClass)} to="/home/men's-fashion">Men's Fashion</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => (isActive? activeClass : notactiveClass)} to="/home/electronics">Electronics</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => (isActive? activeClass : notactiveClass)} to="/home/home-lifestyle">Home & Lifestyle</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="mt-20 ml-32">
                    <h1 className="border-l-[16px] border-red-500 pl-2 font-bold text-3xl">{header}</h1>
                    {/*Search bar*/}
                    <div className=" grid grid-cols-3 gap-x-24 gap-y-16 mt-20 mb-12 mr-14 min-h-[400px]">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductLayout;