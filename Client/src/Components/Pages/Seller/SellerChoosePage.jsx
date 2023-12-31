import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { fetchLoggedInSellerAsync, selectLoggedInSeller } from '../../../features/Auth/authSlice';
import { selectLoggedInUserInfo } from '../../../features/user/userSlice';

const SellerChoosePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserInfo);
  const seller = useSelector(selectLoggedInSeller);

  // useEffect(() => {
  //   if (user) {
  //     dispatch(fetchLoggedInSellerAsync(user?.id));
  //   }
    
    
  // }, [dispatch,user])
  
  return (
    <>
      {!user &&  <Navigate to={'/'} replace={true}></Navigate>}
      {seller&&<Navigate to={'/sellerOptions/seller-Dashboard'} replace={true}></Navigate>}
          <div className='h-screen flex flex-col items-center '>
        <h3 className="font-bold text-4xl p-5">Seller Options</h3>
          <div className="flex flex-col gap-10 p-5 mt-2 shadow-lg bg-white h-[200px] w-1/2">
            
          <Link className='bg-purple-600 px-5 py-4 text-white font-bold cursor-pointer rounded-full text-center' to={'sellerLogin'}><button className=''>Seller Login</button></Link>    
        <Link className='bg-green-600 px-5 py-4 text-white font-bold cursor-pointer rounded-full text-center ' to={'sellerRegister'}> <button >Seller Registration</button></Link>
        {/* <Link className='bg-green-600 px-5 py-4 text-white font-bold cursor-pointer rounded-full text-center ' to={'seller-Dashboard'}> <button >Seller Dashboard</button></Link>   */}
      </div>
    </div>
    </>

  )
}

export default SellerChoosePage
