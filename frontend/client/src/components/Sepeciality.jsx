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
            <div className='flex sm:justify-center gap-4 pt-5 w-full '>
                {specialityData.map((item,index)=>(
                    <Link key={index} to={`/doctors/${item.speciality}`}>
                        <img src={item.image} alt="" className='w-20' />
                        <p className='text-sm'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </section>
    </div>
  )
}

export default Sepeciality