import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInSeller, selectLoggedInUserToken } from '../authSlice'
import { useNavigate } from 'react-router-dom';
import { selectLoggedInUserInfo } from '../../user/userSlice';

const ProtectedSeller = ({children}) => {
  const user = useSelector(selectLoggedInUserInfo);
  const userToken=useSelector(selectLoggedInUserToken);
  const seller = useSelector(selectLoggedInSeller)
  
  if (!userToken) {
    window.location.replace('/login');
  }
  if (!seller) {
    window.location.replace('/sellerOptions')
  }
  else {
    return children;
  }
}

export default ProtectedSeller
