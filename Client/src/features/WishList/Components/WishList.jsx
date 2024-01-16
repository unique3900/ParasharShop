import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Card, Typography } from "@material-tailwind/react";
import { selectLoggedInUserToken } from '../../Auth/authSlice';
import { deleteWishlistAsync, fetchUserWishlistAsync, selectUserWishList } from '../wishlistSlice';
import { discountedPrice } from '../../../app/constants';
import { IoEyeOutline, IoTrashBinOutline  } from "react-icons/io5";
import { Link } from 'react-router-dom';

const TABLE_HEAD = ["S.N", "Item", "Product","Price", "Option"];

const WishList = () => {
    const dispatch = useDispatch();
  const userToken = useSelector(selectLoggedInUserToken);
  const wishlist = useSelector(selectUserWishList);

  const handleRemoveWishlist = (id) => {
    dispatch(deleteWishlistAsync(id));
  }

  useEffect(() => {
    dispatch(fetchUserWishlistAsync());
    console.log(
      wishlist
    )
  }, [dispatch,userToken])
  

  return (
    <div className='min-h-screen w-full flex flex-col items-center'>
          <Toaster />
          <h1 className="text-center font-bold text-4xl p-2 mt-5">Wishlist</h1>
      {wishlist?.length == 0 ? <p className='text-lg font-bold mt-5 text-red-600'>Wishlist is Empty</p> : (
                  <Card className="h-full w-11/12 overflow-scroll no-scrollbar">
                  <table className="w-full min-w-max table-auto text-left no-scrollbar">
                    <thead className='bg-indigo-600 text-white'>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 text-white p-4">
                            <Typography
                              variant="small"
                              color="white"
                              className="font-normal leading-none "
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist?.map((item, index) => (
                        <tr key={index} className="even:bg-indigo-600/10">
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {index+1}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              <img className='w-16 h-16 rounded-full object-cover' src={`http://localhost:8080/uploads/${item.product.thumbnail}`} alt={item.product.title} /> 
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-bold text-lg">
                            {item.product.title}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography variant="small" color="blue-gray" className="font-bold text-lg">
                            <del className='text-red-600'>{item.product.price}</del> {discountedPrice(item.product)}
                            </Typography>
                          </td>
                          <td className="p-4 flex items-center gap-4 h-24">
                            <IoTrashBinOutline size={28} className='text-red-600 cursor-pointer'  onClick={() => {
                              handleRemoveWishlist(item.id)
                            }}/>
                            <Link to={`/products/${item.product.id}`}><IoEyeOutline size={28} className='text-green-600'/></Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
          )}

    </div>
  )
}

export default WishList
