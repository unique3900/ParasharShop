import React, { useState } from 'react'
import { products } from '../../Data/data'
import {BiCartAdd} from 'react-icons/bi'
import Pagination from '../Layout/Pagination'
const HomepageListing = () => {
    const [page, setPage] = useState(1);

  return (
    <div className='p-10'>
        <h3 className="text-4xl font-bold text-center">Latest Products</h3>
          <div className="grid grid-cols-2 justify-center lg:grid-cols-4 gap-5">
              {
                  products.slice(page*10-10,page*10).map((item, index) => (
                    <div key={index} className="relative flex flex-col gap-2 lg:items-stretch  justify-between px-3 py-4 lg:w-72 shadow-lg">
                    <div className="flex items-center justify-center">
                        <img className='object-cover place-content-center max-h-60' src={item.images[0]} alt="" />
                    </div>
                    <div className="">
                              <h2 className=" text-xl text-purple-700 ">{item.title }</h2>
                    </div>
                    <div className="">
                        <h2 className="text-lg italic text-purple-700">NRS 5000</h2>
                    </div>
  
                    <div className="flex justify-center items-center">
                              <button className="relative w-full bg-purple-800 text-white px-3 py-2 rounded-full">Add to Cart</button>
                              <BiCartAdd className='absolute right-14 text-white w-7 h-8'/>
                    </div>
                </div>
                  ))
              }

          </div>
          <Pagination page={page } setPage={setPage} totalPage={products.length} />
    </div>
  )
}

export default HomepageListing
