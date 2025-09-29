import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { useState } from "react";
import Notification from "../UI/Notification";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "../UI/Modal";

const Contact = () => {
    const [showForm, setShowForm] = useState(false);
    const [showNotify, setShowNotify] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const inputClass ="bg-gray-100 py-3 px-3 w-1/3 text-left bordre border-none focus:border-none focus:bg-gray-200 rounded-md";

    const MessageHandler = (event) => {
        event.preventDefault();
        setShowForm(true);
        // send message to DataBase
        if (user) {
            setShowForm(false);
        }
        setShowNotify(true);
        event.target.reset();
    }
    return(
        <div>
            <div className="flex mt-24 ml-24 mb-20">
                <div className="border w-96 p-8 space-y-4 shadow-sm">
                    <div className="flex items-center gap-4 ">
                        <div className=" text-white bg-red-500 h-10 w-10 flex items-center justify-center rounded-full">
                            <IoCallOutline size={24}/>
                        </div>
                        <span className="text-lg font-medium">Call To Us</span>
                    </div>
                    <div>We are available 24/7, 7 days a week.</div>
                    <div>Phone: +8801611112222</div>
                    <div className="border border-b border-gray-400"/>
                    <div className="flex items-center gap-4 ">
                        <div className=" text-white bg-red-500 h-10 w-10 flex items-center justify-center rounded-full">
                            <CiMail size={24}/>
                        </div>
                        <span className="text-lg font-medium">Write To US</span>
                    </div>
                    <div>Fill out our form and we will contact you within 24 hours.</div>
                    <div>Emails: customer@exclusive.com</div>
                    <div>Emails: support@exclusive.com</div>
                </div>
                <form onSubmit={MessageHandler} className="border ml-10 w-2/3 p-8 space-y-4 shadow-sm mr-24">
                    <div className="flex items-center gap-6">
                        <input type="text" id="firstName" placeholder="Your Name *" required className={inputClass}/> 
                        <input type="email" id="email" placeholder="Your Email *" required className={inputClass}/>
                        <input type="number" id="phone" placeholder="Your Phone *" required className={`${inputClass} appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}/>
                    </div>
                    <textarea  type="textarea" id="firstName" placeholder="Your Massage" required className={`${inputClass} w-full h-2/3`}/>
                    <div className="flex justify-end">
                        <button className="text-white bg-red-500 py-3 px-9 rounded-md hover:bg-red-600 transition duration-200">
                            Send Message
                        </button>
                    </div>
                </form >
            </div>
        {showNotify && (
        <Notification
            message="Thank you! We have received your message."
            onClose={() => setShowNotify(false)}
        />
        )}
        {showForm && (
        <Modal open={showForm} onClose={() => setShowForm(false)}>
          <Modal className="flex flex-col justify-center items-center gap-y-3">
            <span className=" text-2xl font-medium">Sign in</span>
            <span>For Faster Checkout</span>
            <Link
              to="/login"
              className="text-white bg-red-500 py-3 px-12 rounded-md mb-10"
            >
              Log in
            </Link>
          </Modal>
        </Modal>
      )}
        </div>
    )
}

export default Contact;