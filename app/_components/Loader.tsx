import React from "react";

const Loader: React.FC = () => {
  return (
    <div className=" inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin  scroll-auto"></div>
    </div>
  );
};

export default Loader;
