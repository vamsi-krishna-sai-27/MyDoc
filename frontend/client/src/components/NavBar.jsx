import React, { useState } from 'react';
import assets from '../assets/react.svg';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-between text-sm py-5 mx-20 mb-5 border-b border-gray-300 font-medium">
    
      {/* Logo */}
      <Link to="/">
        <img src={assets} className="w-12" alt="Logo" />
      </Link>
      
      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-5 text-gray-700">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 hover:text-blue-700 transition-colors duration-200"
        >
          HOME
          
        </NavLink>
        <NavLink
          to="/doctors"
          className="flex flex-col items-center gap-1 hover:text-blue-700 transition-colors duration-200"
        >
          ALL DOCTORS
          
        </NavLink>
        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 hover:text-blue-700 transition-colors duration-200"
        >
          ABOUT
          
        </NavLink>
        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 hover:text-blue-700 transition-colors duration-200"
        >
          CONTACT
          
        </NavLink>
        <NavLink
          to="/admin"
          className="flex flex-col items-center gap-1"
        >
          <button className="border border-gray-400 px-2 rounded-2xl text-sm hover:bg-gray-100 transition">
            Admin Panel
          </button>
        </NavLink>
      </ul>

      {/* Create Account Button */}
      <ul>
        <NavLink to="/register">
          <button className="rounded-3xl px-5 py-3 bg-sky-500 text-white hover:bg-sky-600 transition">
            Create Account
          </button>
        </NavLink>
      </ul>
    </div>
  );
};

export default NavBar;
