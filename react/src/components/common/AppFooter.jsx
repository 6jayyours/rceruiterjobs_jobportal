import React from 'react';

const AppFooter = () => {
  return (
    <footer className="h-12 bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div>
        <a
          href="#"
          target="_blank"
          className="text-indigo-500 hover:text-indigo-400 transition-colors duration-300"
        >
          Recruiter
        </a>
        <span className="ml-1">&copy; 2024 Bootcamp</span>
      </div>
      <div className="ml-auto">
        <span className="mr-1">Powered by</span>
        <a
          href="#"
          target="_blank"
          className="text-indigo-500 hover:text-indigo-400 transition-colors duration-300"
        >
          Recruiter &amp; Arjun M
        </a>
      </div>
    </footer>
  );
};

export default AppFooter;
