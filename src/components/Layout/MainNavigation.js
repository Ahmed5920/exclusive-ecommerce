import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TbLogout2, TbLogin2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../services/authApi";
import { setError } from "../../store/authSlice";

const MainNavigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalQuantity);
  const loggedIn = useSelector((state) => state.auth.user);
  const activeClass = "border-b-2 border-gray-400";
  const baseClass = "hover:border-b-2 hover:border-black";

  const logHandler = async () => {
    if (loggedIn) {
      try {
        await logoutUser();
        navigate("/home");
      } catch (error) {
        dispatch(setError(error.message));
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-8 py-4 md:h-20 border-b-2 relative">
      <Link to="/home" className="text-2xl font-bold md:ml-20">
        Exclusive
      </Link>

      {/*  button Mobile only */}
      <button
        className="md:hidden flex items-center justify-center"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              mobileMenuOpen
                ? "M6 18L18 6M6 6l12 12" // X icon when open
                : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
            }
          />
        </svg>
      </button>

      {/* Navigation - Desktop */}
      <nav className="hidden md:flex flex-1 justify-center">
        <ul className="flex space-x-10 text-gray-700 font-medium">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? activeClass : baseClass)}
              to="/home"
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? activeClass : baseClass)}
              to="/home/contact"
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? activeClass : baseClass)}
              to="/home/about"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? activeClass : baseClass)}
              to="/login"
            >
              Log in
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Cart & Account */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Link to="/home/cart">
            <IoCartOutline size={26} />
          </Link>
          {totalAmount > 0 && (
            <div className="absolute flex items-center justify-center bg-red-500 -top-1 -right-2 w-4 h-4 rounded-full">
              <div className="text-gray-200 text-xs">{totalAmount}</div>
            </div>
          )}
        </div>

        {/* Account Dropdown */}
        <button className="relative group focus-within:outline-none">
          <div type="button" className="flex items-center focus:outline-none">
            <MdOutlineAccountCircle size={26} />
          </div>
          <div className="absolute z-10 top-full right-0 mt-1 bg-gradient-to-tl from-gray-700 to-violet-300 text-white rounded-lg w-56 px-4 py-2 gap-y-1 shadow-md scale-y-0 group-focus-within:scale-y-100 origin-top transition-transform duration-300">
            <div
              type="button"
              onClick={() => {
                document.activeElement.blur();
              }}
            >
              {loggedIn && (
                <div className="flex flex-col items-start justify-center space-y-3 p-2">
                  <div
                    className="flex flex-row items-center justify-center gap-2 focus:outline-none"
                    onClick={() => {
                      navigate("/home/my-account");
                    }}
                  >
                    <MdOutlineAccountCircle size={20} />
                    <span>Manage My Account</span>
                  </div>
                  <div
                    className="flex flex-row items-center gap-2 focus:outline-none"
                    onClick={() => {
                      logHandler();
                    }}
                  >
                    <TbLogout2 size={20} />
                    <span>logout</span>
                  </div>
                </div>
              )}
              {!loggedIn && (
                <div
                  className="flex flex-row items-center gap-2 focus:outline-none"
                  onClick={() => {
                    logHandler();
                  }}
                >
                  <TbLogin2 /> <span>login</span>
                </div>
              )}
            </div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col md:hidden z-20">
          <NavLink
            to="/home"
            end
            className="p-4 border-b text-gray-700 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/home/contact"
            className="p-4 border-b text-gray-700 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink
            to="/home/about"
            className="p-4 border-b text-gray-700 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/login"
            className="p-4 text-gray-700 font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Log in
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default MainNavigation;
