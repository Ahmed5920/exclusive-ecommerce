import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import Contact from "../components/contact/Contact"
const ContactPage = () => {
    return(
        <Fragment>
            <div className="ml-24 space-x-3 mt-16 text-gray-400">
                <Link to="/home">Home</Link>
                <span>/</span>
                <span className="text-black">Cantact</span>
            </div>
            <Contact/>
        </Fragment>
    )
}

export default ContactPage;