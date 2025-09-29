import { useEffect } from "react";

const Notification = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg animate-slide-in z-50">
      {/* ✅ Simple checkmark icon (SVG) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>

      <span className="text-sm font-medium">{message}</span>

      {/* ❌ Close button */}
      <button onClick={onClose} className="ml-2 hover:text-black">
        ✖
      </button>
    </div>
  );
};

export default Notification;
