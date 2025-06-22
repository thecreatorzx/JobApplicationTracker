import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-md border-b-4 border-blue-600">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between animate-fade-in">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-700 font-extrabold text-xl shadow-inner">
            JA
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Job Application Tracker
          </h1>
        </div>
        <span className="text-sm sm:text-base italic font-light text-blue-200 hidden sm:block">
          Stay organized. Land the job.
        </span>
      </div>
    </header>
  );
};

export default Header;
