import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavSearchBox from './NavSearchBox'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import NavbarList from './NavbarList';
import { GiHamburgerMenu } from 'react-icons/gi';
const NavBar = () => {
    const [navState, setnavState] = useState(false);
  return (
    <div className='flex flex-col w-full px-10 py-5 lg:py-0 gap-2'>
          {/* Top part of Navbar Logo,search and cart*/}
          
          <div className="flex px-5 max-h-36 flex-row items-center justify-between gap-5">
            {/* Left */}
              <div className="">
              <Link className='w-[200px] h-[200px] hidden lg:flex'><img src={`/img/logo.png`} alt="" /> </Link>
                  <GiHamburgerMenu className='lg:hidden cursor-pointer w-10 h-10' onClick={() => {
                      setnavState(!navState)
              }}/>
              </div>

              {/* Middle */}
              <NavSearchBox />
              
              {/* Right */}
                <AiOutlineShoppingCart className='cursor-pointer w-10 h-10'/>
          </div>

          {/* Bottom Part of Navbar Login,signup,account,etc */}
          <div className="w-full flex items-center justify-center bg-teal-500 bg-opacity-10 lg:bg-black lg:text-white">
              <NavbarList navState={navState} />
      </div>
    </div>
  )
}

export default NavBar
