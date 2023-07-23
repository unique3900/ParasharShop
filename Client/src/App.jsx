import React, { useEffect } from 'react'

import Hero from './Components/Layout/Hero'

import Homepage from './Components/Layout/Homepage'
import { Route, Routes } from 'react-router-dom'
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
import SingleProductPage from './features/product/SingleProductPage'
import { useDispatch, useSelector } from 'react-redux'
import { useSelect } from '@material-tailwind/react'
import { selectLoggedInUser } from './features/Auth/authSlice'
import { getCartByEmailAsync, selectcartItems } from './features/cart/cartSlice'
import Error404NotFound from './Components/Pages/404NotFound'
import OrderSuccessPage from './Components/Pages/OrderSuccessPage'
import UserOrders from './features/user/Components/UserOrders'


axios.defaults.baseURL = 'http://127.0.0.1:8080';
axios.defaults.withCredentials = true;
const App = () => {
  
  const dispatch = useDispatch(); 
  const user = useSelector(selectLoggedInUser);


  useEffect(() => {
    if (!user) {
    return
    }
    else {
      console.log(user)
      dispatch(getCartByEmailAsync(user.email))
    }
      
  }, [dispatch,user])
  
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
        <Route path='/checkout' element={<Protected><CheckoutPage/></Protected> } />
        <Route path='/products/:id' element={<SingleProductPage/>} />
        <Route path='/sellerOptions' element={""} />
        <Route path='/sellerOptions/sellerRegister' element={"" } />
        <Route path='/sellerOptions/sellerLogin' element={""} />
        <Route path='/sellerOptions/seller-Dashboard' element={<></>} />
        <Route path='/order-success/:id' element={<OrderSuccessPage></OrderSuccessPage>} />
        <Route path='/my-orders' element={<UserOrders/>} />
        <Route path='*' element={<Error404NotFound></Error404NotFound>} />
      </Routes>
    </div>
  )
}

export default App
