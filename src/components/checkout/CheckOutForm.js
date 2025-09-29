const CheckOutForm = () => {
  const inputClass =
    "bg-gray-100 py-3 px-3 w-[500px] text-left bordre border-none focus:border-none focus:bg-gray-200 rounded-md";
  return (
    <form className="space-y-6 flex flex-col">
      <h1 className="text-3xl font-medium">Billing Details</h1>
      <div className="flex flex-col gap-y-2">
        <label htmlFor="firstName">
          First Name
          <span className="text-red-400">*</span>
        </label>
        <input type="text" id="firstName" className={inputClass} />
      </div>
      <div className="flex flex-col ">
        <label htmlFor="streetAddress">
          Street Address
          <span className="text-red-400">*</span>
        </label>
        <input type="text" id="streetAddress" className={inputClass} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="apartment">Apartment, floor, etc. (optional)</label>
        <input type="text" id="apartment" className={inputClass} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="townOrCity">
          Town/City <span className="text-red-400">*</span>
        </label>
        <input type="text" id="townOrCity" className={inputClass} />
      </div>
      <div className="flex flex-col">
        <label htmlFor="phoneNumber">
          Phone Number <span className="text-red-400">*</span>
        </label>
        <input
          type="number"
          id="phoneNumber"
          className={`${inputClass} appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="emailAddress">
          Email Address <span className="text-red-400">*</span>
        </label>
        <input type="email" id="emailAddress" className={inputClass} />
      </div>
    </form>
  );
};

export default CheckOutForm;
