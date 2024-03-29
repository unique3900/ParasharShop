import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { resetCartAsync } from '../../features/cart/cartSlice';
import { logoutUserAsync, selectLoggedInUserInfo } from '../../features/user/userSlice';
import { removeTokenAsync } from '../../features/Auth/authSlice';
import { resetAddressAsync } from '../../features/Addresses/addressSlice';
import { resetSellerOrderAsync } from '../../features/order/orderSlice';
import { resetWishListAsync } from '../../features/WishList/wishlistSlice';

const LogoutPage = () => {
    const user = useSelector(selectLoggedInUserInfo);
    const dispatch = useDispatch();
  const navigate = useNavigate();

    useEffect(() => {
      dispatch(logoutUserAsync());
      dispatch(resetCartAsync());
      dispatch(removeTokenAsync());
      dispatch(resetAddressAsync());
      dispatch(resetSellerOrderAsync());
      dispatch(resetWishListAsync());
        toast(<p className="flex items-center justify-center gap-2"> <img className='max-h-4' src='/img/success.png'></img> Logged Out of System</p>);
        navigate('/login');
      }, [dispatch])
    
  return (
    <div>
      <Toaster/>
    </div>
  )
}

export default LogoutPage
