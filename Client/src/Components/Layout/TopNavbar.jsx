import React from 'react'
import { Link } from 'react-router-dom'

const TopNavbar = () => {
  return (
    <div className='flex flex-row justify-end items-end w-full py-2 px-5 bg-[#65036eda]'>
      <Link to={'/sellerOptions'} className='underline text-white font-bold'>Seller at ParasharShop</Link>
    </div>
  )
}

export default TopNavbar
