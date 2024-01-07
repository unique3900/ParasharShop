import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    FaSearch
} from 'react-icons/fa';
import { fetchAllProductsAsync, searchProductAsync } from '../product/productListSlice';
import { useNavigate} from 'react-router-dom';
const NavSearchBox = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [prevScroll, setPrevScroll] = useState(0);
  const [visible, setVisible] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
      dispatch(searchProductAsync(searchQuery));
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setVisible(currentPosition < 10)
      setPrevScroll(currentPosition)
    }
    
    window.addEventListener('scroll', handleScroll);
    return ()=> window.addEventListener('scroll', handleScroll)
  }, [prevScroll,visible])
  

  return (
    <form className={` ${visible?'relative lg:w-full ':'fixed left-0 top-5 z-[999] lg:w-80'} px-2 h-auto lg:flex items-center`} onSubmit={handleSearch}>
      <input type="search" name="navSearch" value={searchQuery} className='h-fit outline-double outline-blue-600 py-3 px-3 rounded-full flex-1' onChange={(e) => {
        
        setSearchQuery(e.target.value)
       }} onKeyUp={handleSearch}   placeholder='Search....' id=""/>
       <div className=''>
                <button className='bg-[#ffc220] p-2 rounded-full absolute bottom-2 right-5 ' type="submit" value=""><FaSearch className='text-black'/></button>
            </div>
    </form>
  )
}

export default NavSearchBox
