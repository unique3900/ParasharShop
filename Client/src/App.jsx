import React, { useEffect } from 'react'

import Hero from './Components/Layout/Hero'

import Homepage from './Components/Layout/Homepage'
import { Route, Routes } from 'react-router-dom'
import SingleProductPage from './Components/Products/SingleProductPage'
import axios, { Axios } from 'axios'
import TopNavbar from './Components/Layout/TopNavbar'
import { Toaster } from 'react-hot-toast'
import NavBar from './features/Navbar/Navbar'
import RegisterPage from './Components/Pages/RegisterPage'
import LoginPage from './Components/Pages/LoginPage'
import CartPage from './Components/Pages/CartPage'
import CheckoutPage from './Components/Pages/CheckoutPage'
import Protected from './features/Auth/Components/Protected'
import Cart from './features/cart/Cart'


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
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/cart' element={
          <Protected>
              <CartPage />
          </Protected>
          
        } />
        <Route path='/checkout' element={<CheckoutPage/>} />
        <Route path='/products/:id' element={""} />
        <Route path='/sellerOptions' element={""} />
        <Route path='/sellerOptions/sellerRegister' element={"" } />
        <Route path='/sellerOptions/sellerLogin' element={""} />
        <Route path='/sellerOptions/seller-Dashboard' element={<></> } />
      </Routes>
    </div>
  )
}

export default App
