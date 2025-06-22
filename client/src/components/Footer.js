import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t-4 border-blue-600 mt-12 shadow-inner">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center animate-fade-in">
        <p className="text-sm sm:text-base font-medium text-gray-300">
          © {new Date().getFullYear()} Job Application Tracker — Built with 💙
          for job seekers
        </p>
        <p className="text-xs text-gray-500 mt-1">All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
