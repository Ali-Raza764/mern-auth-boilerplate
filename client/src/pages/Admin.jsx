import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/api/auth"
      : "https://mern-auth-boilerplate-ten.vercel.app/api/auth";

  const [users, setUsers] = useState(null);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/users`);
        console.log(res);

        if (res.data.users) {
          setUsers(res.data.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  if (!users) {
    return <main>No Users Found</main>;
  }

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-semibold text-white mb-4">User List</h2>
      <table className="min-w-full table-auto text-white border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Avatar</th>
            <th className="p-2 text-left">Last Login</th>
            <th className="p-2 text-left">Verified</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b border-gray-800 hover:bg-gray-900 transition duration-150"
            >
              <td className="p-2 flex items-center">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 flex items-center">
                {user.role === "admin" ? (
                  <svg
                    className="w-6 h-6 text-yellow-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v16h16V4H4zm8 14a6 6 0 100-12 6 6 0 000 12z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.12 11.29a4.13 4.13 0 01-.41.39 4.62 4.62 0 01-2.83 1.06 4.62 4.62 0 01-2.83-1.06 4.24 4.24 0 01-.41-.39"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-blue-400 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 12c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5zm-5 7.38C7 16.99 9.01 16 12 16s5 1 5 3.38V22H7v-2.62z"
                    />
                  </svg>
                )}
                {user.role}
              </td>
              <td className="p-2">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="p-2">
                {new Date(user.lastLogin).toLocaleString()}
              </td>
              <td className="p-2">
                {user.isVerified ? (
                  <span className="text-green-500">Yes</span>
                ) : (
                  <span className="text-red-500">No</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
