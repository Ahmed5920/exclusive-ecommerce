import { Link } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import Account from "../components/Account/Account";

const MyAccount = () => {
    return(
        <Fragment>
            <div className="ml-24 space-x-3 mt-16 text-gray-400">
                <Link to="/home">Home</Link>
                <span>/</span>
                <span className="text-black">My Account</span>
            </div>
            <Account/>
        </Fragment>
    )
}

export default MyAccount;