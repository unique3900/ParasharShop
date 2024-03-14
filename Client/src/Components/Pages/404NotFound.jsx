import React from 'react'
import { BiSolidErrorAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
const Error404NotFound = () => {
  return (
    <div className='h-screen flex flex-col items-center '>
          <div className="flex p-5 flex-col  items-center gap-3 h-4/5  w-4/5">

              <img className='h-2/5' src={'/img/errorimg.png'} alt="" />
              <div className="flex flex-col gap-4">
                  <h3 className="text-center font-bold text-5xl text-red-600">Page Not Found</h3>
                  <p className="">Sorry,The page you are looking for is not available or has been moved from<span className='font-bold text-purple-700 cursor-pointer'><Link to='/'> Parashar Shop</Link> </span> </p>
              <Link to={'/'} className='px-3 py-2 bg-purple-700 text-white font-bold cursor-pointer text-center rounded-lg'>Go back</Link>
              </div>
     
      </div>
    </div>
  )
}

export default Error404NotFound
