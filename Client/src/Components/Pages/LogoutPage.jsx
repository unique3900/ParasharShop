import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAsync, selectLoggedInUser } from '../../features/Auth/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { resetCartAsync } from '../../features/cart/cartSlice';

const LogoutPage = () => {
    const user = useSelector(selectLoggedInUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(logoutUserAsync(user));
      // dispatch(resetCartAsync(user.id))
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
