import React, { useState } from 'react'
import { products } from '../../Data/data'
import { BiCartAdd } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import Pagination from '../Layout/Pagination';
import toast, { Toaster } from 'react-hot-toast';
const HomepageListing = () => {
    const [page, setPage] = useState(1);

  return (
    <div className='p-10'>
      <Toaster />
        <h3 className="text-4xl font-bold text-center">Latest Products</h3>
          <div className="grid grid-cols-2 justify-center lg:grid-cols-4 gap-5">
              {
                  products.slice(page*12-12,page*12).map((item, index) => (
                    <div key={index} className="relative flex flex-col gap-2 lg:items-stretch  justify-between px-3 py-4 lg:w-72 shadow-lg">
                    <div className="flex items-center justify-center">
                        <img className='object-cover place-content-center max-h-60' src={item.images[0]} alt="" />
                          </div>
                          <AiOutlineHeart className='absolute top-0 right-1 fill-red-600 cursor-pointer w-8 h-8 text-red-500' onClick={()=>{
                            toast.success( `${item.title.slice(0,20)+'...'} Added to Wishlist` )
                          }}/>
                    <div className="">
                              <h2 className=" text-xl text-purple-700 ">{item.title }</h2>
                    </div>
                    <div className="">
                        <h2 className="text-lg italic text-purple-700">NRS 5000</h2>
                    </div>
  
                    <div className="flex justify-center items-center">
                              <button className="relative w-full bg-purple-800 text-white px-3 py-2 rounded-full">Add to Cart</button>
                              <BiCartAdd className='absolute right-10 lg:right-14 text-white w-5 h-5 lg:w-7 lg:h-8'/>
                    </div>
                </div>
                  ))
              }

          </div>
          <Pagination page={Math.ceil(page) } setPage={setPage} totalPage={Math.floor(products.length)} />
    </div>
  )
}

export default HomepageListing
