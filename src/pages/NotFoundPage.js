import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const NotFoundPage = () => {
    return(
        <Fragment>
            <div className="ml-24 space-x-3 mt-16 text-gray-400">
            <Link to="/Home">home</Link>
            <span>/</span>
            <span className="text-black">404 Error</span>
        </div>
            <div className="flex flex-col items-center justify-center h-screen text-center gap-12 ">
                <div className="text-9xl font-medium">
                    404 Not Found
                </div>
                <div>Your visited page not found. You may go home page.</div>
                <Link to="/home" className="text-white bg-red-500 px-8 py-4">Back to home page</Link>
            </div>
        </Fragment>
    )
}

export default NotFoundPage;