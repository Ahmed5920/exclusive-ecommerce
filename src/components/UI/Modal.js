const Modal = ({ open, children, onClose }) => {
    if(!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg w-11/12 md:w-2/3 lg:w-1/3 p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <button className="text-black ml-auto" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
