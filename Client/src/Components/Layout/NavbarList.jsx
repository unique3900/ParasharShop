import React from 'react'
import {
    navList
} from '../../Data/data'
import {
    Link
} from 'react-router-dom'
import { AiOutlineHome , AiOutlineUserAdd,AiOutlineLogout} from 'react-icons/ai';
import { BsTags ,BsFillKeyboardFill} from 'react-icons/bs';
import { BiSolidUserCircle,BiSolidKey } from 'react-icons/bi';
const NavbarList = ({
    navState
}) => {
    return (
        <> {
            navState == false && (
                <div className='hidden lg:flex flex-row w-2/3 py-2 justify-center gap-5 font-bold'>

                    <div className="flex flex-row items-center gap-2">
                        <AiOutlineHome className='w-8 h-5'/>
                        <Link to={'/'} className='hover:scale-105 hover:font-extrabold'>Home</Link>
                    </div>


                    <div className="flex flex-row items-center gap-2">
                        <BsTags className='w-8 h-5'/>
                        <Link className='hover:scale-105 hover:font-extrabold'>Categories</Link>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <BiSolidUserCircle className='w-8 h-5'/>
                        <Link to={'/dashboard'} className='hover:scale-105 hover:font-extrabold'>Dashboard</Link>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <BiSolidKey className='w-8 h-5'/>
                        <Link to={'/login'} className='hover:scale-105 hover:font-extrabold'>Login</Link>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <BsFillKeyboardFill className='w-8 h-5'/>
                        <Link to={'/register'} className='hover:scale-105 hover:font-extrabold'>Signup</Link>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <AiOutlineLogout className='w-8 h-5'/>
                        <Link className='hover:scale-105 hover:font-extrabold'>Logout</Link>
                    </div>

                </div>
            )
        }


            {
            navState == true && (
                <div className='flex h-screen flex-col text-black font-bold w-full px-3 py-10 items-center gap-14'>
                                        <div className="flex flex-row items-center gap-2">
                        <AiOutlineHome className='w-8 h-5'/>
                        <Link to={'/'} className='hover:scale-105 hover:font-extrabold'>Home</Link>
                    </div>


                    <div className="flex flex-row items-center gap-2">
                        <BsTags className='w-8 h-5'/>
                        <Link className='hover:scale-105 hover:font-extrabold'>Categories</Link>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <BiSolidUserCircle className='w-8 h-5'/>
                        <Link to={'/dashboard'} className='hover:scale-105 hover:font-extrabold'>Dashboard</Link>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <BiSolidKey className='w-8 h-5'/>
                        <Link to={'/login'} className='hover:scale-105 hover:font-extrabold'>Login</Link>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <BsFillKeyboardFill className='w-8 h-5'/>
                        <Link to={'/register'} className='hover:scale-105 hover:font-extrabold'>Signup</Link>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <AiOutlineLogout className='w-8 h-5'/>
                        <Link className='hover:scale-105 hover:font-extrabold'>Logout</Link>
                    </div>
                    
                    
                    
                </div>
            )
        } </>


    )
}

export default NavbarList
