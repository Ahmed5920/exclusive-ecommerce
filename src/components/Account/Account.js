import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserPassword, updateUserProfile } from "../../services/profileApi";
import Notification from "../UI/Notification";

const Account = () => {
  const user = useSelector((state) => state.auth.user);
  const [showNotify, setShowNotify] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    newPassword:""
  });
  const navigate = useNavigate();
  const inputClass =
    "bg-gray-100 py-3 px-3 w-96 text-left bordre border-none focus:border-none focus:bg-gray-200 rounded-md";

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

  const editProfileHandler = async (event) => {
    event.preventDefault();
    if (!user) return alert("User not logged in!");

    const { firstName, lastName, email, address, newPassword } = formData;

    const res = await updateUserProfile(user.email, { firstName, lastName, email, address });
    if (!res.success) return alert("Error updating profile.");

    if (newPassword) {
      const passRes = await updateUserPassword(newPassword);
      if (!passRes.success) return alert("Error updating password.");
    }
    setShowNotify(true)
    setFormData((prev) => ({ ...prev, newPassword: "" }));
  };

  return (
    <div>
      <form
        onSubmit={editProfileHandler}
        className="mt-24 ml-64 mb-20 border w-2/3 px-16 py-10 shadow-sm"
      >
        <h1 className="text-red-500 text-2xl font-medium">Edit Your Profile</h1>
        <div className="grid grid-rows-2 grid-cols-2 mt-4 gap-x-28 gap-y-5 ">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" value={formData.firstName} onChange={changeHandler} required className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" value={formData.lastName} onChange={changeHandler} required className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formData.email} onChange={changeHandler} required className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={formData.address} onChange={changeHandler} required className={inputClass} />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-10 space-y-2">
          <label htmlFor="password">Password Changes</label>
          <input
            type="password"
            id="newPassword"
            placeholder="New Password"
            className={`${inputClass} w-full`}
            value={formData.newPassword} 
            onChange={changeHandler}
          />
        </div>
        <div className="flex justify-end mt-5 gap-8">
          <button type="button" onClick={() => navigate(0)}>
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-red-500 py-3 px-9 rounded-md hover:bg-red-600 transition duration-200"
          >
            Send Message
          </button>
        </div>
      </form>
      {showNotify && (
        <Notification
            message="Profile updated successfully!"
            onClose={() => setShowNotify(false)}
        />
        )}
    </div>
  );
};

export default Account;
