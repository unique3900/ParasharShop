import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    FaSearch
} from 'react-icons/fa';
import { fetchAllProductsAsync, fetchProductsByFilterAsync, searchProductAsync } from '../product/productListSlice';
import { useNavigate} from 'react-router-dom';
const NavSearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    
    e.preventDefault();
    if (!searchQuery.length <= 0) {
      dispatch(searchProductAsync(searchQuery));
      setLoader(true);
      setTimeout(() => {
        window.scrollBy(0, 750);
        setLoader(false);
      }, 1500);
    }
    else {
      window.location.reload()
      dispatch(fetchProductsByFilterAsync({}))
    }
  }
  return (
    <form className='relative px-2 lg:w-full h-auto  lg:flex items-center' onSubmit={handleSearch}>
      <input type="search" name="navSearch" value={searchQuery} className='h-fit outline-double outline-blue-600 py-3 px-3 rounded-full flex-1' onChange={(e) => {
        
        setSearchQuery(e.target.value)
      }} onKeyUp={handleSearch} placeholder='Search....' id="" />
      

       <div className=''>
                <button className='bg-[#ffc220] p-2 rounded-full absolute bottom-2 right-5 ' type="submit" value=""><FaSearch className='text-black'/></button>
            </div>
    </form>
  )
}

export default NavSearchBox
