import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar Header */}
      <div className="border-b border-gray-600 px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <div className="text-white font-bold text-xl">Mern Auth</div>
        </Link>
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center text-white focus:outline-none transition-all duration-200 ease-in-out"
            >
              <span className="mr-2">{user.name}</span>
              <img
                className="h-8 w-8 rounded-full border-2 border-gray-500 hover:border-indigo-500 transition-all duration-200 ease-in-out"
                src={user.avatar} // Example profile picture
                alt="User Profile"
              />
            </button>
            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out transform ${
                isOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                role="menuitem"
              >
                Settings
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150"
                role="menuitem"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/sign-in"
              className="text-white rounded-md border px-3 p-2"
            >
              SignIn
            </Link>
            <Link
              to="/sign-up"
              className="text-white rounded-md border px-3 p-2"
            >
              SignUp
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const NavbarWrapper = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default NavbarWrapper;
