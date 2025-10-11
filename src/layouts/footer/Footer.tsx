import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 py-4 text-center text-sm border-t border-gray-200 dark:border-gray-700">
      <p>© {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
