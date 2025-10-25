import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
const Login = () => {
 const [isLogin, setIsLogin] = useState(false); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        {/* Heading */}
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? "Login" : "Create Account"}
          </h2>
          <p className="text-gray-500">
            {isLogin
              ? "Please log in to book appointment"
              : "Please sign up to book appointment"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 placeholder-gray-400"
                placeholder="Your Name"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 placeholder-gray-400"
              placeholder="email@example.com"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 placeholder-gray-400"
              placeholder="********"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </div>
        </form>

        {/* Switch Links */}
        <p className="text-center text-gray-500">
          {isLogin ? (
            <>
              Create a new account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-sky-500 hover:underline"
              >
                Click here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-sky-500 hover:underline"
              >
                Login here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );

}

export default Login