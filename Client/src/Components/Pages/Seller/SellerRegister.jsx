import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser, updateUserAsync } from '../../../features/Auth/authSlice';



const SellerRegister = () => {
    const user = useSelector(selectLoggedInUser);
    const [businessName, setBusinessName] = useState('');
    const [businessAddress, setBusinessAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState(false);


    const dispatch = useDispatch();


    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { businessName, businessAddress,businessPassword: password };
        if (user.businessInfo) {
            alert("Already a Business Registered")
        }
        else {
            dispatch(updateUserAsync({ ...user, businessInfo: data }));
        }
        
    }

    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <Toaster/>
            <div className=" grid mt-0 grid-flow-row gap-3 lg:grid-flow-col items-center align-middle lg:grid-cols-2 w-full lg:w-fit   p-6 round-xl shadow-md shadow-slate-400 overflow-x-auto no-scrollbar">
                <div className="hidden lg:flex relative justify-center place-content-center">
                    <img className='lg:w-full lg:h-[500px] h-60'
                        src={'/img/registerpageImg.png'}
                        alt=""/>
                </div>


                <div className="">
                    <h1 className='text-center text-4xl lg:text-6xl py-5 '>Seller Registration</h1>

                    <form onSubmit={(e) => { handleSubmit(e) }} className="form grid grid-flow-row  lg:grid-cols-1   gap-2  mt-5">

                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Business Name:</label>
                            <input type="text" name='name' required className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm' value={businessName} onChange={(e)=>{
                                setBusinessName(e.target.value)
                            }} />
                            {
                                error && !businessName?(
                                    <p className="italic text-red-500">Business Name is Required*</p>
                                ):""
                            }
                           
                        </div>
                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Location:</label>
                            <input value={businessAddress} type="text" name='name' required className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm' onChange={(e)=>{
                                setBusinessAddress(e.target.value)
                            }} />
                            {
                                error && !businessAddress?(
                                    <p className="italic text-red-500">Location is Required*</p>
                                ):""
                            }
                        </div>
                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Password:</label>
                            <input value={password} type="password" name='name' required className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm' onChange={(e)=>{
                                setPassword(e.target.value)
                            }} />
                            {
                                error && !password?(
                                    <p className="italic text-red-500">Password is Required*</p>
                                ):""
                            }
                        </div>
                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Confirm Password:</label>
                            <input value={confirmPassword} type="password" name='name' required className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm' onChange={(e)=>{
                                setConfirmPassword(e.target.value)
                            }} />
                            {
                                error && !confirmPassword?(
                                    <p className="italic text-red-500">Email is Required*</p>
                                ) : password !== confirmPassword ? (
                                    <p className="italic text-red-500">Password Doesnot Match*</p>  
                                ):""
                            }
                        </div>


                        <button  type='submit' className='mt-1 bg-blue-500 p-2 w-full text-white'
                           >Register</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default SellerRegister
