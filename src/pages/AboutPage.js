import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import AboutDescription from "../components/about/AboutDescription";
import AboutTeam from "../components/about/AboutTeam";
import AboutServices from "../components/about/AboutServices";

const AboutPage = () => {
  return (
    <Fragment>
      <div className="mt-8 md:mt-16 text-gray-400 px-6 md:px-24 space-x-2">
        <Link to="/home">Home</Link>
        <span>/</span>
        <span className="text-black">About</span>
      </div>
      <AboutDescription />
      <AboutTeam />
      <AboutServices />
    </Fragment>
  );
};

export default AboutPage;
