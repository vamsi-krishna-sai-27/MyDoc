import React, { useState } from 'react';

const Admin = () => {
  const [isAdminLogin, setIsAdminLogin] = useState(false);

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

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              defaultValue={isAdminLogin ? "" : ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 placeholder-gray-400"
              placeholder={isAdminLogin ? "admin@example.com" : "email@example.com"}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              defaultValue={isAdminLogin ? "" : ""}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 placeholder-gray-400"
              placeholder="•••••••••••••"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {isAdminLogin ? "Login" : "Login"}
            </button>
          </div>
        </form>

        {/* Switch Link */}
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
