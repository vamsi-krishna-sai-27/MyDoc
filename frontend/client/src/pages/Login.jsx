import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken, loadUserProfileData } = useContext(AppContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // 🔹 LOGIN
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          await loadUserProfileData();
          toast.success("Logged in successfully!");
          navigate("/"); // ✅ redirect after successful login
        } else {
          toast.error(data.message);
        }
      } else {
        // 🔹 SIGNUP
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          await loadUserProfileData();
          toast.success("Account created successfully!");
          navigate("/"); // ✅ redirect after successful signup
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }

    setLoading(false);
  };

  // 🔹 Redirect only if token exists AND we are currently on /login
  useEffect(() => {
    if (token && window.location.pathname === "/login") {
      navigate("/");
    }
  }, [token, navigate]);

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
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 placeholder-gray-400"
              placeholder="********"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              {loading
                ? "Processing..."
                : isLogin
                ? "Login"
                : "Create Account"}
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
};

export default Login;
