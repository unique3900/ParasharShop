import React, { useEffect } from 'react'

import Hero from './Components/Layout/Hero'
import Register from './features/Auth/Register'
import Homepage from './Components/Layout/Homepage'
import { Route, Routes } from 'react-router-dom'
import SingleProductPage from './Components/Products/SingleProductPage'
import axios, { Axios } from 'axios'
import TopNavbar from './Components/Layout/TopNavbar'
import { Toaster } from 'react-hot-toast'
import NavBar from './features/Navbar/Navbar'
import Login from './features/Auth/Login'
import SellerChoosePage from './features/Auth/SellerChoosePage'
import SellerRegister from './features/Auth/SellerRegister'
import SellerLogin from './features/Auth/SellerLogin'


axios.defaults.baseURL = 'http://127.0.0.1:8080';
axios.defaults.withCredentials = true;
const App = () => {
  
  return (
    <div>

      <TopNavbar/>
      <NavBar/>
      <Toaster/>
      
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/products/:id' element={<SingleProductPage />} />
        <Route path='/sellerOptions' element={<SellerChoosePage/>} />
        <Route path='/sellerOptions/sellerRegister' element={<SellerRegister/> } />
        <Route path='/sellerOptions/sellerLogin' element={<SellerLogin/> } />
        <Route path='/sellerOptions/seller-Dashboard' element={<></> } />
      </Routes>
    </div>
  )
}

export default App
