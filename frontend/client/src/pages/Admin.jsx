import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  // When user clicks Login, redirect based on selected type
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdminLogin) {
      navigate("/adminpanel");
    } else {
      navigate("/doctorpanel");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        {/* Heading */}
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {isAdminLogin ? "Admin Login" : "Doctor Login"}
          </h2>
          <p className="text-gray-500">
            {isAdminLogin
              ? "Please login to access admin panel"
              : "Please login to access appointments"}
          </p>
        </div>

        {/* Form (inputs are just for UI) */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-400"
              placeholder={
                isAdminLogin ? "admin@example.com" : "email@example.com"
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder-gray-400"
              placeholder="•••••••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Login
            </button>
          </div>
        </form>

        {/* Switch Login Type */}
        <p className="text-center text-gray-500">
          {isAdminLogin ? (
            <>
              Doctor Login?{" "}
              <button
                type="button"
                onClick={() => setIsAdminLogin(false)}
                className="text-sky-500 hover:underline"
              >
                Click here
              </button>
            </>
          ) : (
            <>
              Admin Login?{" "}
              <button
                type="button"
                onClick={() => setIsAdminLogin(true)}
                className="text-sky-500 hover:underline"
              >
                Click here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Admin;
