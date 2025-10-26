import React from 'react';
import assets from '../assets/react.svg';
import { Link, NavLink } from 'react-router-dom';

const DocNav = () => {


  return (
    <div className="flex items-center justify-between text-sm py-5 px-5 mb-5 border-b border-gray-300 font-medium">
    
      {/* Logo */}
      <Link to="/doctorpanel" className='flex items-center justify-center gap-2'>
        <img src={assets} className="w-12" alt="Logo" />
            <button className="border border-gray-400 text-gray-500 px-2 rounded-2xl text-sm hover:bg-gray-100 transition">
            Doctor Panel
          </button>
      </Link>
      <ul>
        <NavLink to="/login">
          <button className="rounded-3xl px-5 py-3 bg-sky-500 text-white hover:bg-sky-600 transition">
            Logout  
          </button>
        </NavLink>
      </ul>

    </div>
  );
}

export default DocNav