import React from 'react'
import {assets} from '../assets/assets/assets_frontend/assets.js'
const AboutDoc = () => {
  return (
     <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      
      
      <h2 className="text-4xl font-bold text-center text-[#4B5563]">
        About <span className="font-bold text-[#1F2937]">Us</span>
      </h2>

      
      <div className="flex flex-col md:flex-row items-start gap-10">
        
        
        <div className="md:w-1/2">
          <img 
            src={assets.about_image} 
            alt="About Us" 
            className="w-110 rounded-xl shadow-lg object-cover ml-30"
          />
        </div>

        {/* Right: Text */}
        <div className="md:w-1/2 text-[#4B5563] text-lg space-y-6">
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <p>
            <span className="font-bold text-gray-900">Our Vision</span>
          </p>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>

          

        </div>
      </div>
      
        <div className="mt-8">
  <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
    Why Choose Us
  </h3>

  <div className="flex flex-col md:flex-row gap-6 justify-between">
    {/* Efficiency */}
    <div className="flex-1 border p-4 rounded-xl shadow-sm">
      <h4 className="text-xl font-semibold text-gray-900 mb-2">Efficiency</h4>
      <p className="text-gray-700">
        Streamlined appointment scheduling that fits into your busy lifestyle.
      </p>
    </div>

    {/* Convenience */}
    <div className="flex-1 border p-4 rounded-xl shadow-sm">
      <h4 className="text-xl font-semibold text-gray-900 mb-2">Convenience</h4>
      <p className="text-gray-700">
        Access to a network of trusted healthcare professionals in your area.
      </p>
    </div>

    {/* Personalization */}
    <div className="flex-1 border p-4 rounded-xl shadow-sm">
      <h4 className="text-xl font-semibold text-gray-900 mb-2">Personalization</h4>
      <p className="text-gray-700">
        Tailored recommendations and reminders to help you stay on top of your health.
      </p>
    </div>
  </div>
</div>


    </div>
  )
}

export default AboutDoc