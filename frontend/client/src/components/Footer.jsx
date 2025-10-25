import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#010f92] text-gray-300 py-5  px-6 md:px-20 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        
        {/* Left Section */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">About</h2>
          <p className="text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">Company</h2>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="/delivery" className="hover:text-white transition-colors">
                Delivery
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-4">Get In Touch</h2>
          <p className="text-sm mb-2">+0-000-000-000</p>
          <p className="text-sm">unitedcoders@gmail.com</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-gray-500 text-sm mt-5 border-t border-gray-700 pt-2">
        © {new Date().getFullYear()} United Coders. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
