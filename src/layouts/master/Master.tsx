import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

interface MasterLayoutProps {
  children: React.ReactNode;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="flex-grow pt-20 pb-20 px-4 sm:px-6 lg:px-8 w-full max-w-7xl min-w-7xl mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MasterLayout;
