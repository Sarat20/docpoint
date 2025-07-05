import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate("/login");
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

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

      <div className="flex items-center gap-4 relative">
        {!isLoggedIn && (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-2 rounded-full hidden md:block"
          >
            Create Account
          </button>
        )}

        {isLoggedIn && (
          <div className="relative">
            <img
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              src={assets.user_avatar || "/default-avatar.png"}
              alt="User"
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md z-50">
                <button
                  onClick={handleProfile}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

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
