import React from "react";

const FullScreenSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
      <div className="h-16 w-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-white text-lg font-medium tracking-wide">
        Please wait, loading...
      </p>
    </div>
  );
};

export default FullScreenSpinner;
