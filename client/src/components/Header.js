import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between animate-fade-in">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
            JA
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Job Application Tracker
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
