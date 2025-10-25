import React from 'react'
import {assets} from '../assets/assets/assets_frontend/assets.js'
const ContactUs = () => {
  return (
    <div className='max-w-7xl mx-auto px-6 py-16 space-y-16'>
              <h2 className="text-4xl font-bold text-center text-[#4B5563]">
                Contact <span className="font-bold text-[#1F2937]">Us</span>
              </h2>
        
              
              <div className="flex flex-col md:flex-row items-start gap-10">
                
                
                <div className="md:w-1/2">
                  <img 
                    src={assets.contact_image} 
                    alt="About Us" 
                    className="w-100 rounded-xl shadow-lg object-cover ml-45"
                  />
                </div>
        
                {/* Right: Text */}
                <div className="md:w-1/2 text-[#4B5563] text-lg space-y-6">
                  <p className='font-bold'>
                        Our OFFICE
                      </p>
                  <p>
                        54709 Willms Station <br />
                        Suite 350, Washington, USA                 
                    </p>
                  <p>
                    Tel: (415) 555‑0132 <br />
                    Email: unitedcoders@gmail.com
                  </p>
                  <p className='font-bold'>
                        Careers at PRESCRIPTO
                  </p>
                    <p>
                        Learn more about our teams and job openings.
                    </p>
                    <button className='border-1 px-8 py-4 cursor-pointer'>
                        Explore Jobs
                    </button>
                </div>
              </div>
    </div>
  )
}

export default ContactUs