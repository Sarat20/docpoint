import React from 'react'
import { Routes, Route } from 'react-router-dom'

import {ToastContainer,toast} from 'react-toastify'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Home from './pages/Home'

const App = () => {
  return (
    <div className="mx-10 sm:mx-[10%]">
      <ToastContainer/>
     <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />

      </Routes>
      
      <Footer/>
    </div>
  )
}

export default App