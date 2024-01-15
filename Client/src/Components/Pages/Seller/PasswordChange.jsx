import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { changeSellerPasswordAsync, fetchLoggedInSellerAsync, selectLoggedInSeller, selectLoggedInUserToken } from '../../../features/Auth/authSlice';
import { selectLoggedInUserInfo } from '../../../features/user/userSlice';

const PasswordChange = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const userToken = useSelector(selectLoggedInUserToken);
    const userInfo = useSelector(selectLoggedInUserInfo);
    const seller = useSelector(selectLoggedInSeller);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!oldPassword || !newPassword) {
            setError(true);
            return;
        }
        if (!error) {
            const data = {
                seller: seller?.id,
                oldPassword,
                newPassword
            }
            await dispatch(changeSellerPasswordAsync(data));
            navigate('/sellerOptions/seller-Dashboard')
        }
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLoggedInSellerAsync());
    }, [dispatch])
    
  return (
      <div className='h-screen w-full flex flex-col items-center '>
          <Toaster/>
        <h1 className="text-center font-bold text-4xl my-5 p-2">
               Change Password
          </h1>
          
          <div className="mt-5 flex justify-center gap-8  w-4/6 h-1/2 shadow-lg rounded-md ">
              {/* Image */}
                <img src="/img/change-seller-password.png" className='hidden lg:flex object-cover' alt="Change Password" />

              <div className="px-2 flex justify-center ">
                  <form  action="" className='flex flex-col items-center justify-center gap-2' onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-2 w-full">
                          <label htmlFor="" className='font-bold text-xl'>Old Password</label>
                          <input type="text" className='w-96' value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}} />
                          {error && !oldPassword && (
                              <p className="text-red-600 text-lg">Please Enter Old Password</p>
                          )}
                          
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                          <label htmlFor="" className='font-bold text-xl'>New Password</label>
                          <input type="text" className='w-96' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                          {error && !newPassword && (
                              <p className="text-red-600 text-lg">Please Enter New Password</p>
                          )}
                      </div>

                      <button
                          type='submit'
                        className='bg-indigo-600 text-white px-3 py-2 rounded-md mt-5 w-full'>Change Password</button>
                  </form>
              </div>

          </div>
      
    </div>
  )
}

export default PasswordChange
