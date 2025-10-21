import React from 'react'
import {assets} from '../assets/assets/assets_frontend/assets.js'
const Hero = () => {
  return (
    <div className="flex items-center justify-between text-sm mx-20 mb-5">
        <div className='bg-blue-500 w-500 h-119.5 rounded-xl relative'>
            <div>
                <img src={assets.header_img} alt=""  className='absolute top-6 right-20 w-140  '/>
            </div>
            <div>
                <p className='text-white text-5xl font-bold w-130 absolute top-30 left-20'>Book Appointment With Trusted Doctors</p>
                <img src={assets.group_profiles} alt="" className='absolute top-60 left-20 w-25' />
                <p className='text-white absolute top-60 left-50 w-100'>Simply browse through our extensive list of trusted doctors,
schedule your appointment hassle-free.</p>
                <a href="#speciality" className='absolute top-75 left-20 flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm  md:m-0 hover:scale-105 transition-all duration-300'>Book Appoinment <img src={assets.arrow_icon} alt="" /></a>
            </div>

        </div>
    </div>
  )
}

export default Hero