import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

const Layout = () => {

    return(
        <div className="flex flex-col min-h-screen">
            <MainNavigation />
            <div className="flex-grow min-h-[500px]">
            <   Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout;