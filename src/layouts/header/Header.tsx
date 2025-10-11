import React from "react";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border-b border-white/20 dark:border-gray-700/40 shadow-sm z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">EnactOn IT</h1>
      </div>
    </header>
  );
};

export default Header;
