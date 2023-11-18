import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInSeller, selectLoggedInUser } from '../authSlice'
import { useNavigate } from 'react-router-dom';

const ProtectedSeller = ({children}) => {
  const user = useSelector(selectLoggedInUser);
  const seller=useSelector(selectLoggedInSeller)
  if (!user) {
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
