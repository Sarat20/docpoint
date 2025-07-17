import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import DoctorLogin from './DoctorPages/DoctorLogin';
import DoctorList from './DoctorPages/DoctorList';
import DoctorProfile from './DoctorPages/DoctorProfile'
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  return (
    <div className="mx-10 sm:mx-[10%]">
      <ToastContainer />
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path='/doctors' element={<DoctorList/>}/>
        <Route path='/doctor/:id' element={<DoctorProfile/>}/>

      </Routes>

      <Footer />
    </div>
  );
};

export default App;
