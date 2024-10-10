import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const SignUp = () => {
  const { signup, error, isLoading: loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;

      await signup(email, password, name);
      navigate("/verify");
    } catch (error) {
      console.error;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-transparent border border-gray-700 rounded-lg p-8 w-96">
        <h2 className="text-3xl text-white font-semibold mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-md text-center">
              {error}
            </div>
          )}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 bg-transparent border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="w-full flex items-center justify-between mt-3">
          Already have an account{" "}
          <Link to={"/sign-in"} className="text-indigo-600">
            SignIn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
