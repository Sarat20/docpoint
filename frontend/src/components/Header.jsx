import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate('/login');
  };

  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
      {/* ----------left side---- */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight lg:leading-tight'>
          Book Appointment<br />With Trusted Doctors
        </p>

        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt="" />
          <p>
            "Explore our network of trusted doctors,<br className='hidden sm:block' />
            book your appointment seamlessly in moments!"
          </p>
        </div>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 m-auto md:m-0'>
          {/* Book Appointment Button */}
          <button
            onClick={handleBookClick}
            className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-sm text-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-md'
          >
            Book Appointment
            <img className='w-3' src={assets.arrow_icon} alt="" />
          </button>

          {/* Doctor Login Button (fixed with hover) */}
          <a
            href="/doctor-login"
            target="_blank"
            rel="noopener noreferrer"
            className='inline-flex items-center justify-center border border-white px-8 py-3 rounded-full text-sm text-black bg-white transition-all duration-300 hover:bg-gray-200 hover:shadow-md hover:text-gray-800' // Added hover:text-gray-800
          >
            Doctor Login
          </a>
        </div>
      </div>

      {/* ---------right side--- */}
      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;