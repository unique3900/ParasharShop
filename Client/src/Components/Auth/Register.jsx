import React, { useState } from 'react'
import axios from 'axios';
import { ToastBar, Toaster, toast } from 'react-hot-toast';
const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");

    const [error, setError] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!fullName || !email || !password || !confirmPassword || !address || !phone || !gender) {
            setError(true);
        }
        const { data } = await axios.post('/api/v1/auth/register', { fullName, email, password, address, phone,gender });
        if (data.success) {
            toast.success(data.message)
        }
        else {
            toast.error(data.message);
        }
        console.log(fullName,email,phone,gender,address,password,confirmPassword)
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
                    <h1 className='text-center text-4xl lg:text-6xl py-5 '>Register</h1>

                    <form onSubmit={handleSubmit} className="form grid grid-flow-row  lg:grid-cols-1   gap-2  mt-5">

                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Full Name:</label>
                            <input type="text" name='name' required className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm' value={fullName} onChange={(e)=>{
                                setFullName(e.target.value)
                            }} />
                            {
                                error && !fullName?(
                                    <p className="italic text-red-500">Name is Required*</p>
                                ):""
                            }
                           
                        </div>
                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Email:</label>
                            <input value={email} type="text" name='name' required className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm' onChange={(e)=>{
                                setEmail(e.target.value)
                            }} />
                            {
                                error && !email?(
                                    <p className="italic text-red-500">Email is Required*</p>
                                ):""
                            }
                        </div>
                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Phone:</label>
                            <input value={phone} type="number" name='name' required className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm' onChange={(e)=>{
                                setPhone(e.target.value)
                            }}  />
                            {
                                error && !phone?(
                                    <p className="italic text-red-500">Phone is Required*</p>
                                ) : phone &&  phone.length!==10? (
                                    <p className="italic text-red-500">Invalid Phone Number*</p>    
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
                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Address:</label>
                            <input value={address} type="text" name='name' required className='outline-black border-b-2 px-2 py-2 rounded-md shadow-sm' onChange={(e)=>{
                                setAddress(e.target.value)
                            }} />
                            {
                                error && !address?(
                                    <p className="italic text-red-500">Address is Required*</p>
                                ):""
                            }
                        </div>

                        <div className="inputBox flex flex-col gap-1">
                            <label htmlFor="Name">Gender:</label>

                            <div className="flex flex-row justify-evenly items-center">
                                <div className="flex flex-row gap-1 items-center justify-center">
                                    <label htmlFor="">Male</label>
                                    <input onChange={(e) => {
                                        setGender(e.target.value)
                                    }} type="radio" name="gender" value={'male'} id="" />
                                </div>
                                <div className="flex flex-row gap-1 items-center justify-center">
                                    <label htmlFor="">Female</label>
                                    <input onChange={(e) => {
                                        setGender(e.target.value)
                                    }} type="radio" name="gender" value={'female'} id="" />
                                </div>
                                <div className="flex flex-row gap-1 items-center justify-center">
                                    <label htmlFor="">Other</label>
                                    <input onChange={(e) => {
                                        setGender(e.target.value)
                                    }} type="radio" name="gender" value={'other'} id="" />
                                </div>
                            </div>
                            {
                                error && !gender?(
                                    <p className="italic text-red-500">Gender is Required*</p>
                                ):""
                            }
                        </div>


                        <button type='submit' className='mt-1 bg-blue-500 p-2 w-full text-white'
                           >Register</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Register
