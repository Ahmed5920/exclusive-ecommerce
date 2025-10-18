import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavigation />
      <main className="flex-grow min-h-[500px] px-4 md:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
