import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
const BASE_URL = import.meta.env.VITE_BACKEND_URL; // ✅ ADDED

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultImage);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${BASE_URL}/api/user/get-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileImage(data.user.image || defaultImage);
      } catch (err) {
        console.error("Failed to load avatar:", err);
        setProfileImage(defaultImage);
      }
    };

    if (isLoggedIn) {
      fetchProfileImage();
    }
  }, [isLoggedIn]);

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
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <li className="py-1">Home</li>
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <li className="py-1">All Doctors</li>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <li className="py-1">About</li>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <li className="py-1">Contact</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4 relative">
        {!isLoggedIn ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-6 py-2 rounded-full hidden md:block"
          >
            Create Account
          </button>
        ) : (
          <div className="relative">
            <img
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full object-cover cursor-pointer border"
              src={profileImage}
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
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/appointments"); 
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Appointments
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
