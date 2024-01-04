import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavSearchBox from './NavSearchBox'
import { AiOutlineShoppingCart,AiTwotoneHeart ,AiOutlineHeart} from 'react-icons/ai';
import NavbarList from './NavbarList';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import {  getCartByEmailAsync, selectcartItems } from '../cart/cartSlice';
import { selectLoggedInUser } from '../Auth/authSlice';
const NavBar = () => {
  const [navState, setnavState] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector(selectcartItems);
  
  useEffect(() => {
    dispatch(getCartByEmailAsync())
  }, [])
  
  return (
    <div className='flex flex-col w-full px-10 py-5 lg:py-0 gap-2'>
          {/* Top part of Navbar Logo,search and cart*/}
      
          <div className="flex px-5 max-h-36 flex-row items-center justify-between gap-5">
            {/* Left */}
              <div className="">
              <Link to={'/'} className='w-[200px] h-[200px] hidden lg:flex'><img src={`/img/logo.png`} alt="" /></Link>
                  <GiHamburgerMenu className='lg:hidden cursor-pointer w-10 h-10' onClick={() => {
                      setnavState(!navState)
              }}/>
              </div>

              {/* Middle */}
              <NavSearchBox />
              
              {/* Right */}
        <div className="relative ">

                <Link to={'/cart'}><AiOutlineShoppingCart className=' cursor-pointer w-10 h-10' /></Link>  
                
          {<p className="absolute  bg-red-600 text-white rounded-[100%] px-2 top-0 -right-1">{cartItems.length}</p> }
                
         
        </div>
        <div className="relative ">
                <Link to={'/wishlist'}><AiOutlineHeart className=' cursor-pointer w-10 h-10 fill-red-600' /></Link>  
                <p className= "absolute  bg-red-600 text-white rounded-[100%] px-2 top-0 -right-1">2</p>
              </div>

          </div>

          {/* Bottom Part of Navbar Login,signup,account,etc */}
          <div className="w-full  flex  items-center justify-center bg-teal-500 bg-opacity-10 lg:bg-white  ">
              <NavbarList  navState={navState} />
      </div>
    </div>
  )
}

export default NavBar
