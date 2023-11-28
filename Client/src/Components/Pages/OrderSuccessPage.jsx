import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectLoggedInUser } from '../../features/Auth/authSlice';
import { resetCartAsync } from '../../features/cart/cartSlice';
import { resetOrder } from '../../features/order/orderSlice';
import emailjs from '@emailjs/browser';

const OrderSuccessPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
   
    const user_name = user.fullName;

    const templatevariables = {
        to_name: user_name,
        from_name:"Parashar Shop",
        message: "You Have Received a New Order, Visit your Dashboard to View Detail!"
    }
    emailjs.send(import.meta.env.VITE_EMAIL_SERVICE_ID, import.meta.env.VITE_EMAIL_TEMPLATE, templatevariables,import.meta.env.VITE_EMAIL_PUBLIC_KEY).then(function (response) {
        console.log("Success!",response.status, response.text)
    }).catch(function (error) {
        console.log('FAILED...', error);
    })

   

    useEffect(() => {
        dispatch(resetCartAsync(user.id));
        dispatch(resetOrder())
    }, [dispatch,user])
    
    return (
        <>
            {!user &&  <Navigate to={'/'} replace={true}></Navigate>}
            {!params.id && <Navigate to={'/'} replace={true}></Navigate>}
                <div className='h-screen flex flex-col items-center '>
          <div className="flex p-5 flex-col shadow-lg  justify-center items-center gap-3 h-[500px] w-4/5">
              <div className="flex flex-col items-center gap-4">
                    <img className='max-h-40 w-28' src="/img/success.png" alt="" />
                  <h3 className="text-center font-bold text-5xl text-indigo-700">Thank You!</h3>
                  <p className="text-3xl font-bold">Order Successfully Placed with Order Number <span className='font-bold text-purple-700 cursor-pointer'>#{params.id}</span> </p>
              <Link to={'/'} className='px-3 py-2 bg-purple-700 text-white font-bold cursor-pointer text-center rounded-lg'>Continue Shopping</Link>
              <Link to={'/my-orders'} className='px-3 py-2 bg-indigo-700 text-white font-bold cursor-pointer text-center rounded-lg'>My Orders</Link>
              </div>
     
      </div>
    </div>
      </>

  )
}

export default OrderSuccessPage
