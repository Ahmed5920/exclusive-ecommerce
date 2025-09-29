import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle  } from "react-icons/md";
import { TbLogout2, TbLogin2  } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../services/authApi";
import { setError } from "../../store/authSlice";

const MainNavigation = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const totalAmount = useSelector(state => state.cart.totalQuantity)
    const loggedIn = useSelector(state => state.auth.user)
    const activeClass = "border-b-2 border-gray-400";
    const baseClass = "hover:border-b-2 hover:border-black";
    const logHandler = async() => {
        if(loggedIn){
            try {
                await logoutUser();
                navigate('/home')
            } catch (error) {
                dispatch(setError(error.message));
            }
        }
        else{
            navigate('/login')
        }
    }
return(
    <header className="w-full h-20 flex items-center justify-between px-8 border-b-2">
        <Link to="/home" className="text-2xl font-bold ml-28">Exclusive</Link>
        <nav className="flex-1 flex justify-center">
            <ul className=" flex space-x-10 text-gray-700 font-medium">
                <li>
                    <NavLink className={({isActive }) => (isActive ? activeClass : baseClass)} to="/home" end>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive }) => (isActive ? activeClass : baseClass)} to="/home/contact">
                        Contact
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive }) => (isActive ? activeClass : baseClass)} to="/home/about">
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive }) => (isActive ? activeClass : baseClass)} to="/login">
                    Log in
                    </NavLink>
                </li>
            </ul>
        </nav>
        <div className="mr-28 flex items-center gap-4">
            <div className="relative">
                <Link to="/home/cart"><IoCartOutline size={26}/></Link>
                {totalAmount>0 &&
                <div className="absolute flex items-center justify-center bg-red-500 -top-1 -right-2 w-4 h-4 rounded-full">
                    <div className="text-gray-200 text-xs">{totalAmount}</div>
                </div>}
            </div>
            <button className="relative group focus-within:outline-none" >
                <div
                type="button"
                className="flex items-center focus:outline-none"
                >
                <MdOutlineAccountCircle size={26} />
                </div>
                <div className="absolute z-10 top-full right-0 mt-1 bg-gradient-to-tl from-gray-700 to-violet-300 text-white rounded-lg w-56 px-4 py-2 gap-y-1 shadow-md scale-y-0 group-focus-within:scale-y-100 origin-top transition-transform duration-300">
                    <div
                    type="button"
                    onClick={() => {
                        document.activeElement.blur();
                    }}
                    >
                        {loggedIn &&
                        <div className="flex flex-col items-start justify-center space-y-3 p-2">
                            <div className="flex flex-row items-center justify-center gap-2 focus:outline-none" onClick={() => {navigate('/home/my-account');}}>
                                <MdOutlineAccountCircle size={20} /> 
                                <span>Manage My Account</span>
                            </div>
                            <div className="flex flex-row items-center gap-2 focus:outline-none" onClick={() => {logHandler();}}>
                                <TbLogout2 size={20}/> 
                                <span>logout</span>
                            </div>
                        </div>
                        }
                        {!loggedIn && <div className="flex flex-row items-center gap-2 focus:outline-none" onClick={() => {logHandler();}}><TbLogin2/> <span>login</span></div>}
                    </div>
                </div>
            </button>
            
        </div>
    </header>
);
}

export default MainNavigation;