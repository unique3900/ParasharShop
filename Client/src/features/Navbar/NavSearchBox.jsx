import React from 'react'
import {
    FaSearch
} from 'react-icons/fa';
const NavSearchBox = () => {
  return (
    <form className='relative  px-2 lg:w-full h-auto  lg:flex items-center'>
       <input type="search" name="navSearch" className='h-fit outline-double outline-blue-600 py-3 px-3 rounded-full flex-1' placeholder='Search....' id=""/>
       <div className=''>
                <button className='bg-[#ffc220] p-2 rounded-full absolute bottom-2 right-5 ' type="submit" value=""><FaSearch className='text-black'/></button>
            </div>
    </form>
  )
}

export default NavSearchBox
