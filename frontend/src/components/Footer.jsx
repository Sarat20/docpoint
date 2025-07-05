import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm px-5 md:px-10">

      {/* Left */}
      <div>
        <img className="mb-5 w-40" src={assets.logo_1} alt="Company Logo" />
        <p className="w-full md:w-2/3 text-gray-600 leading-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius nihil molestias placeat repellendus vero vitae laudantium doloribus cum sequi non illum tenetur debitis reiciendis aliquam et omnis voluptatibus quod sed.
        </p>
      </div>

      {/* Middle */}
      <div>
        <h2 className="text-xl font-medium mb-5">Company</h2>
        <ul className="flex flex-col gap-2 text-gray-600">
          <li><a href="#" className="hover:text-gray-800">Home</a></li>
          <li><a href="#" className="hover:text-gray-800">About Us</a></li>
          <li><a href="#" className="hover:text-gray-800">Contact Us</a></li>
          <li><a href="#" className="hover:text-gray-800">Privacy Policy</a></li>
        </ul>
      </div>

      {/* Right */}
      <div>
        <h2 className="text-xl font-medium mb-5">Get In Touch</h2>
        <ul className="flex flex-col gap-2 text-gray-600">
          <li className="cursor-pointer hover:text-gray-800">+1-2-2-435-4578</li>
          <li className="cursor-pointer hover:text-gray-800">saratkumarkalagara@gmail.com</li>
        </ul>
      </div>

      {/* Bottom */}
      <div className="col-span-full">
        <hr className="border-gray-300" />
        <p className="py-5 text-sm text-center text-gray-600">
          &copy; 2024 Prescripto - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
