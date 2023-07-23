import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchLoggedInUserOrdersAsync, selectLoggedInUserOrders } from '../userSlice'
import { selectLoggedInUser } from '../../Auth/authSlice'
import { Navigate } from 'react-router-dom'
const UserOrders = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const orders = useSelector(selectLoggedInUserOrders);

useEffect(() => {

    dispatch(fetchLoggedInUserOrdersAsync(user.id));
    console.log("My Orders",orders)
}, [dispatch,user])


    
  return (
    <>
          {!user && <Navigate to={'/login'} replace={true}></Navigate>}
          <h1 className="">Hello</h1>
    </>
  )
}

export default UserOrders
