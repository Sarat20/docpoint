import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center justify-between py-4 text-sm border-b mb-5 border-b-gray-500 px-5 md:px-10">
      <img
        onClick={() => navigate("/")}
        src={assets.logo_1}
        alt="logo"
        className="cursor-pointer w-32"
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/"><li className="py-1">Home</li></NavLink>
        <NavLink to="/doctors"><li className="py-1">All Doctors</li></NavLink>
        <NavLink to="/about"><li className="py-1">About</li></NavLink>
        <NavLink to="/contact"><li className="py-1">Contact</li></NavLink>
      </ul>
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-primary text-white px-6 py-2 rounded-full hidden md:block"
        >
          Create Account
        </button>
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>
    </div>
  );
};

export default Navbar;
