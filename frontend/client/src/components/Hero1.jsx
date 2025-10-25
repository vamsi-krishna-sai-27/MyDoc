import React from 'react'
import {assets} from '../assets/assets/assets_frontend/assets.js'
const Hero1 = () => {
  return (
    <div><div className="flex items-center justify-between text-sm mx-20 mt-20 mb-5">
            <div className='bg-[#5F6FFF] w-500 h-100 rounded-xl relative'>
                <div>
                    <img src={assets.appointment_img} alt=""  className='absolute bottom-0 right-20 w-100  '/>
                </div>
                <div>
                    <p className='text-white text-5xl font-bold w-130 absolute top-30 left-20'>Book Appointment </p>
                    <p className='text-white text-5xl font-bold w-200 absolute top-45 left-20'>With 100+ Trusted Doctors</p>
        
                    <a href="#speciality" className='absolute top-65 left-20 flex items-center gap-2 bg-white px-8 py-4 rounded-full text-gray-600 text-sm  md:m-0 hover:scale-105 transition-all duration-300'>Create Account <img src={assets.arrow_icon} alt="" /></a>
                </div>
    
            </div>
        </div>
        </div>
  )
}

export default Hero1