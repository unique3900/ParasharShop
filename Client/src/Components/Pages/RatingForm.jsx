import React from 'react'
import { RiStarSLine } from "react-icons/ri";
import { RiStarSFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import { updateRatingStatusAsync } from '../../features/order/orderSlice';
import { fetchLoggedInUserOrdersAsync } from '../../features/user/userSlice';

const RatingForm = ({ userRating, setUserRating,productId,id }) => {
    const dispatch = useDispatch();
    const handleRatingStatusChange = async() => {
        // id,value,productId
        const data={id,productId,value:true}
        await dispatch(updateRatingStatusAsync(data))
        toast.success("Thank You For Rating the Product")
        await dispatch(fetchLoggedInUserOrdersAsync());
       
    }
  return (
      <div className='flex '> 
          <Toaster/>
          {
              [0, 1, 2, 3, 4].map((item, index) => (
                  userRating> index ? (
                      <RiStarSFill  size={28} onClick={() => {
                        setUserRating(index)
                        handleRatingStatusChange()
                    }} className='cursor-pointer text-yellow-600 fill-yellow-600'/>
                  ):
                  <RiStarSLine size={28} onClick={async() => {
                      await setUserRating(index+1)
                      handleRatingStatusChange()
                  }} className='cursor-pointer text-yellow-600 fill-yellow-600' />
              ))
        }
    </div>
  )
}

export default RatingForm
