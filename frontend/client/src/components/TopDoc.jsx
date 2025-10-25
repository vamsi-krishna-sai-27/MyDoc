import React from 'react'
import { doctors } from '../assets/assets/assets_frontend/assets'
import { Link } from 'react-router-dom'
const TopDoc = () => {
      const visibleDoctors = doctors.slice(0, 10);
  return (
    <div>
        <div className='flex flex-col items-center justify-center m-10 '> 
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='m-2 text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        </div>


        <div className="text-center">
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pt-6 px-6 ml-25 mr-25">
        {visibleDoctors.map((item, index) => (
          <Link
            key={index}
            to='/doctors'
            className="flex flex-col items-center justify-between p-4 bg-white rounded-2xl border border-gray-400 hover:-translate-y-2 transition-all duration-300 h-80"
          >
            
            <div className="w-full h-64 flex items-center justify-center bg-[#EAEFFF] rounded-xl overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            
            <div className="text-center mt-3">
              <p className="text-base sm:text-sm md:text-base font-semibold text-gray-800">
                {item.name}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">{item.speciality}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-8">
        <Link
          to="/doctors"
          className="inline-block bg-[#c1cef8] text-[#4B5563] px-12 py-2 rounded-4xl font-medium hover:bg-[#bac2dc] transition-all duration-300"
        >
          more
        </Link>
      </div>
    </div>

    </div>
  )
}

export default TopDoc