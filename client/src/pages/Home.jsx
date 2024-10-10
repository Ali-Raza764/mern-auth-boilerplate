import React from "react";
import { Link } from "react-router-dom"; // If you're using react-router for routing

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl text-white font-bold mb-8">
        Mern Authentication Boilerplate 🔒
      </h1>
      <p className="text-lg text-gray-300 mb-12 text-center max-w-md">
        Equiped with modern feature to provide seamless user experience.
      </p>
      <div className="flex space-x-6">
        {/* Sign Up Link */}
        <Link to="/sign-up">
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out">
            Sign Up
          </button>
        </Link>
        {/* Sign In Link */}
        <Link to="/sign-in">
          <button className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-600 transition duration-200 ease-in-out">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
