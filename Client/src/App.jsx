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
import UserInfo from './features/user/Components/UserInfo'
import { fetchLoggedInUserInfo } from './features/user/userAPI'
import { fetchLoggedInUserInfoAsync, selectLoggedInUserInfo } from './features/user/userSlice'
import LogoutPage from './Components/Pages/LogoutPage'
import ChangePassword from './Components/Pages/Password/ChangePassword'
import SellerChoosePage from './Components/Pages/Seller/SellerChoosePage'
import SellerLogin from './Components/Pages/Seller/SellerLogin'
import ProtectedSeller from './features/Auth/Components/ProtectedSeller'
import SellerDashboard from './Components/Pages/Seller/SellerDashboard'
import SellerRegister from './Components/Pages/Seller/SellerRegister'
import ProductPage from './Components/Pages/Seller/ProductPage'
import ProductForm from './Components/Pages/Seller/ProductForm'
import EditProduct from './Components/Pages/Seller/EditProduct'


axios.defaults.baseURL = 'http://127.0.0.1:8080';
axios.defaults.withCredentials = true;
const App = () => {
  
  const dispatch = useDispatch(); 
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectLoggedInUserInfo);

  useEffect(() => {
    if (!user) {
    return
    }
    else {
      dispatch(getCartByEmailAsync(user.email));
      dispatch(fetchLoggedInUserInfoAsync(user.id))
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
        <Route path='/logout' element={<LogoutPage />} />
        <Route path='/change-password' element={<Protected><ChangePassword/></Protected> } />
        <Route path='/cart' element={
          <Protected>
              <CartPage />
          </Protected>
          
        } />
        <Route path='/checkout' element={<Protected><CheckoutPage/></Protected> } />
        <Route path='/products/:id' element={<SingleProductPage/>} />
        <Route path='/sellerOptions' element={<SellerChoosePage/>} />
        <Route path='/sellerOptions/sellerRegister' element={<SellerRegister/> } />
        <Route path='/sellerOptions/sellerLogin' element={<SellerLogin/>} />
        <Route path='/order-success/:id' element={<OrderSuccessPage></OrderSuccessPage>} />
        <Route path='/sellerOptions/seller-Dashboard' element={<ProtectedSeller><SellerDashboard/></ProtectedSeller>} />
        <Route path='/sellerOptions/seller-Dashboard/manage-products' element={<ProtectedSeller><ProductPage/></ProtectedSeller>} />
        <Route path='/sellerOptions/seller-Dashboard/manage-products/edit-product/:id' element={<ProtectedSeller><EditProduct/></ProtectedSeller>} />
        <Route path='/sellerOptions/seller-Dashboard/manage-products/add-product' element={<ProtectedSeller><ProductForm/></ProtectedSeller>} />
        <Route path='/my orders' element={<Protected><UserOrders/></Protected> } />
        <Route path='/my profile' element={<UserInfo/>} />
        <Route path='*' element={<Error404NotFound></Error404NotFound>} />
      </Routes>
    </div>
  )
}

export default App
