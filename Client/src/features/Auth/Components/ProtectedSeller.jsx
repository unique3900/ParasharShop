import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { useNavigate } from 'react-router-dom';

const ProtectedSeller = ({children}) => {
  const user = useSelector(selectLoggedInUser);
  
  if (!user) {
    // alert("Login to Continue")
    window.location.replace('/login');
  }
  if (user.role === 'buyer') {
    // alert("Not a seller")
    window.location.replace('/');
  }
  const businessExist = Object.keys(user.businessInfo).length;
  if (businessExist <= 0) {
    // alert("No Business Registered")
    window.location.replace('/');
  }
  else {
    return children;
  }
}

export default ProtectedSeller
