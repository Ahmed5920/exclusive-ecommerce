import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const NotFoundPage = () => {
  return (
    <Fragment>
      <div className="ml-4 md:ml-24 space-x-3 mt-8 md:mt-16 text-gray-400 text-sm md:text-base">
        <Link to="/home">Home</Link>
        <span>/</span>
        <span className="text-black">404 Error</span>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center gap-6 md:gap-12">
        <div className="text-4xl sm:text-7xl md:text-9xl font-medium leading-tight">
          404 Not Found
        </div>
        <div className="text-sm sm:text-base md:text-lg text-gray-600">
          Your visited page was not found. You may go back to the home page.
        </div>
        <Link
          to="/home"
          className="text-white bg-red-500 px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-red-600 transition"
        >
          Back to Home Page
        </Link>
      </div>
    </Fragment>
  );
};

export default NotFoundPage;
