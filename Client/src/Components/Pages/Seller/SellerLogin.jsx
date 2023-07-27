import React, { useState } from 'react'
import axios from 'axios';
import { ToastBar, Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../../../features/Auth/authSlice';
const SellerLogin = () => {

    const user = useSelector(selectLoggedInUser);
    const [password, setPassword] = useState("");
    
    

    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.businessInfo.businessPassword == password) {
            toast("Seller Authenticated");
            navigate("/sellerOptions/seller-Dashboard");
        }
        else {
            toast.error("Invalid Business Password")
        }
    }

    return (
        <div className='flex flex-col h-screen justify-center items-center'>
            <Toaster/>
            <div className=" grid mt-0 grid-flow-row gap-3 lg:grid-flow-col items-center align-middle lg:grid-cols-2 w-full lg:w-fit   p-6 round-xl shadow-md shadow-slate-400 overflow-x-auto no-scrollbar">
                <div className="hidden lg:flex relative justify-center place-content-center">
                    <img className='lg:w-full lg:h-[500px] h-60'
                        src={'/img/loginpageimg.png'}
                        alt=""/>
                </div>


                <div className="">
                    <h1 className='text-center text-4xl lg:text-6xl py-5 '>Seller Login</h1>

                    <form onSubmit={(e) => {
                        handleSubmit(e)
                    }} className="form grid grid-flow-row  lg:grid-cols-1   gap-2  mt-5">
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
                        <button type='submit' className='mt-1 bg-blue-500 p-2 w-full text-white'
                           >Login</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default SellerLogin
