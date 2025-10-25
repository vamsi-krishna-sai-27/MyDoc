import React from 'react'
import { specialityData } from '../assets/assets/assets_frontend/assets'
import { Link } from 'react-router-dom'
const Sepeciality = () => {
  return (
    <div>
        <section id="speciality">
            <div className='flex items-center flex-col justify-center mt-20'>
                <p className='text-3xl font-medium'>Find by Speciality</p>
                <p className='mt-2 text-sm'>Simply browse through our extensive list of trusted doctors,</p>
                <p className='text-sm'>schedule your appointment hassle-free.</p>
            </div>
            <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
                {specialityData.map((item,index)=>(
                    <Link className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
                        <img src={item.image} alt="" className='w-16 sm:w-24 mb-2 ' />
                        <p className='text-sm text-center mr-2'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </section>
    </div>
  )
}

export default Sepeciality