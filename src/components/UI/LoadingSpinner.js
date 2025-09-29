const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-20 h-20 
                   after:content-[''] after:block after:w-16 after:h-16 after:m-2 
                   after:rounded-full after:border-4 after:border-teal-600 after:border-t-transparent 
                   after:animate-spin"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
