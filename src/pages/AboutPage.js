import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import AboutDescription from "../components/about/AboutDescription";
import AboutTeam from "../components/about/AboutTeam";
import AboutServices from "../components/about/AboutServices";

const AboutPage = () => {
  return (
    <Fragment>
      <div className="ml-24 space-x-3 mt-16 text-gray-400">
        <Link to="/home">Home</Link>
        <span>/</span>
        <span className="text-black">About</span>
      </div>
      <AboutDescription/>
      <AboutTeam/>
      <AboutServices/>
    </Fragment>
  );
};

export default AboutPage;
