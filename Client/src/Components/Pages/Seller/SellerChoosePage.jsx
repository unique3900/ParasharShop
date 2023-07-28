import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { selectLoggedInSeller, selectLoggedInUser } from '../../../features/Auth/authSlice';

const SellerChoosePage = () => {
  const user = useSelector(selectLoggedInUser);
  const seller = useSelector(selectLoggedInSeller);
  return (
    <>
      {!user && <Navigate to={'/'} replace={true}></Navigate>}
      {seller&&<Navigate to={'/sellerOptions/seller-Dashboard'} replace={true}></Navigate>}
          <div className='h-screen flex flex-col items-center '>
        <h3 className="font-bold text-4xl p-5">Seller Options</h3>
          <div className="flex flex-col gap-10 p-5 mt-2 shadow-lg bg-white h-[200px] w-1/2">
            
          <Link className='bg-purple-600 px-5 py-4 text-white font-bold cursor-pointer rounded-full text-center' to={'sellerLogin'}><button className=''>Seller Login</button></Link>    
        <Link className='bg-green-600 px-5 py-4 text-white font-bold cursor-pointer rounded-full text-center ' to={'sellerRegister'}> <button >Seller Registration</button></Link>
        <Link className='bg-green-600 px-5 py-4 text-white font-bold cursor-pointer rounded-full text-center ' to={'seller-Dashboard'}> <button >Seller Dashboard</button></Link>  
      </div>
    </div>
    </>

  )
}

export default SellerChoosePage
