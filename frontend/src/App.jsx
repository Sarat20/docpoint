import React from 'react'
import { Routes, Route } from 'react-router-dom'

import {ToastContainer,toast} from 'react-toastify'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
const App = () => {
  return (
    <div className="mx-10 sm:mx-[10%]">
     <Navbar/>
      <Header/>
      <Footer/>
    </div>
  )
}

export default App