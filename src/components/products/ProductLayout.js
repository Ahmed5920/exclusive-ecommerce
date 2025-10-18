import { useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { categoryNames, categories } from "../../constants/categoryNames";

const ProductLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const param = useParams();
  const category = param.category;
  const activeClass = "text-red-500 font-bold border-l-4 border-red-500 pl-2";
  const notActiveClass =
    "text-gray-700 hover:text-red-400 transition-colors duration-200";

  const location = useLocation();
  let header;
  if (location.pathname === "/home/all-products") {
    header = "All Products";
  } else {
    header = categoryNames[category] || category;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="hidden md:block w-64 border-r-2 h-screen sticky top-0 bg-white">
        <ul className="space-y-3 ml-4 mt-12">
          {categories.map((cat) => (
            <li key={cat.path}>
              <NavLink
                to={cat.path}
                className={({ isActive }) =>
                  isActive ? activeClass : notActiveClass
                }
              >
                {cat.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <div className="md:hidden px-4 mt-4">
        <button
          className="bg-gray-200 px-4 py-2 rounded shadow"
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

      <main className="flex-1 px-4 md:px-8 mt-6 md:mt-20">
        <h1 className="border-l-4 border-red-500 pl-3 font-bold text-3xl mb-4 text-center md:text-left">
          {header}
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mb-12 min-h-[400px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProductLayout;
