import React, { useState } from 'react';
import assetss from '../assets/react.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets/assets_frontend/assets';

const NavBar = () => {
  const navigate=useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true)
  return (
    <div className="flex items-center justify-between text-sm py-5 mx-20 mb-5 border-b border-gray-300 font-medium">
    
      {/* Logo */}
      <Link to="/">
        <img src={assetss} className="w-12" alt="Logo" />
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

      
      <ul>
        
        <div>
          {
            token? <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img src={assets.profile_pic} alt="" className='w-8 rounded-full'/>
                <img src={assets.dropdown_icon} alt="" className='w-2.5 '/>
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                  <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer' >My Profile</p>
                    <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointment</p>
                    <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                  </div>
                </div>
            </div>: <button onClick={()=>navigate('/login')} className="rounded-3xl px-5 py-3 bg-sky-500 text-white hover:bg-sky-600 transition">
              Create Account
            </button>
          }
        
        </div>
      
        
      </ul>
    </div>
  );
};

export default NavBar;