import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-6 sm:px-8 md:px-12 py-10 bg-primary text-white rounded-lg shadow-md">
      <h2 className="text-center text-3xl font-bold mb-10">About Me</h2>

      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6 md:gap-10">
        {/* Image */}
        <img
          className="w-32 sm:w-36 md:w-40 lg:w-48 rounded-lg"
          src={assets.profile}
          alt="About Sarat"
        />

        {/* Info */}
        <div className="flex-1 text-base leading-relaxed text-center md:text-left">
          <p className="mb-4">Hello, I’m Sarat Kumar from Visakhapatnam, India.</p>
          <p className="mb-4">
            I’m a Computer Science student at IIIT Kottayam with a strong interest in backend development and full stack web applications.
          </p>
          <p className="mb-4">
            This is a MERN stack project (MongoDB, Express.js, React.js, Node.js). I enjoy building real-world applications and learning by doing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
