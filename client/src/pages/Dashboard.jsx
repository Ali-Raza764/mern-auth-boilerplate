import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, isCheckingAuth, checkAuth, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }
  if (!user) {
    navigate("/");
  }
  return (
    <div className="flex flex-col items-center bg-transparent text-white p-6 rounded-lg shadow-md w-full max-w-xs mx-auto">
      <img
        src={user.avatar}
        alt="user-image"
        className="w-24 h-24 rounded-full border-2 border-gray-300 mb-4"
      />
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-gray-400 mb-4">{user.email}</p>

      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
