import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-2">
      <div className="text-center px-2 sm:px-6 md:px-10 lg:px-20 py-6 sm:py-8 rounded-lg bg-white shadow-2xl w-full max-w-xs sm:max-w-lg md:max-w-2xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-primary relative z-10">
            404
          </h1>
        </div>
        <p className="text-lg sm:text-2xl font-medium text-gray-600 mb-4 sm:mb-6">
          Oops! Page Not Found
        </p>
        <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground text-xs sm:text-sm font-medium rounded-full hover:bg-primary/90 transition-colors duration-300 inline-flex items-center"
          onClick={handleHomeClick}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
