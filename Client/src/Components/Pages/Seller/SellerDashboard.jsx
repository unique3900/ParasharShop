import React, { useEffect, useState } from 'react'
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    Link,
    Navigate
} from 'react-router-dom';
import {
    fetchLoggedInSellerAsync,
    selectLoggedInSeller
} from '../../../features/Auth/authSlice';
import { fetchLoggedInUserInfo } from '../../../features/user/userAPI';
import LineGraph from '../../Layout/LineGraph';
import { selectLoggedInUserInfo } from '../../../features/user/userSlice';
import { fetchProductBySellerIdAsync, sellerProducts } from '../../../features/product/productListSlice';
import { fetchOrderForSellerAsync, selectSellerOrder } from '../../../features/order/orderSlice';
const SellerDashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUserInfo);
    const seller = useSelector(selectLoggedInSeller);
    const products = useSelector(sellerProducts);
    const orders = useSelector(selectSellerOrder);
    const [sellerRevenue, setSellerRevenue] = useState(0);

    const targetSellerId = seller?.id;

// Function to calculate total revenue for a seller
function calculateTotalRevenue(orders, targetSellerId) {
  let totalRevenue = 0;

  orders.forEach((order) => {
    order.products.forEach((product) => {
      // Check if the product is sold by the target seller
      if (product.seller === targetSellerId) {
        // Calculate the price after discount, if applicable
        const discountedPrice = product.product.discountPercentage
          ? (product.product.price * (100 - product.product.discountPercentage)) / 100
          : product.product.price;

        // Add the price to total revenue
        totalRevenue += discountedPrice * product.quantity;
      }
    });
  });
    
  return totalRevenue;
}

    

    useEffect(() => {
        dispatch(fetchLoggedInSellerAsync())
        dispatch(fetchProductBySellerIdAsync(seller?.id))
        dispatch(fetchOrderForSellerAsync(seller?.id))
        const totalRevenue = calculateTotalRevenue(orders, targetSellerId);
        setSellerRevenue(Math.ceil(totalRevenue))
    }, [dispatch,user])
    
    return (<>


        <div className='h-screen flex flex-col lg:justify-center items-center p-5 mt-10'>
            <h1 className="text-center font-bold text-4xl p-5">Seller Dashboard</h1>
            <p className='font-bold text-xl text-purple-600 text-center'>Welcome,{seller.businessName }</p>
            <div className="grid grid-rows-1 lg:grid-cols-[1fr_2fr] w-full h-full gap-3">

                <div className="flex flex-row h-fit lg:flex-col gap-2 text-sm flex-wrap">
                    <Link className='bg-red-700 text-white font-bold text-center px-3 py-2'>Manage Category</Link>
                    <Link to={'manage-products'} className='bg-purple-700 text-white font-bold text-center px-3 py-2'>Manage Products</Link>
                    <Link to={'manage-orders'} className='bg-blue-700 text-white font-bold text-center px-3 py-2'>Manage Orders</Link>
                    <Link to={'change-password'} className='bg-green-700 text-white font-bold text-center px-3 py-2'>Change Business Password</Link>
                </div>
                <div className="h-full flex flex-col items-center justify-center  w-full">
                    <div className="grid grid-rows-1 lg:grid-cols-[2fr_2fr_2fr] justify-between gap-10 p-10">
                        <div className="flex flex-col shadow-md p-10 bg-pink-400 items-center ">
                            <h4 className="text-lg">Total Products</h4>
                            <p className="font-bold text-xl">{products?.length}</p>
                        </div>

                        <div className="flex flex-col shadow-md p-10 bg-teal-400 items-center">
                            <h4 className="text-lg ">Total Orders</h4>
                            <p className="font-bold text-xl">{orders?.length }</p>
                        </div>

                        <div className="flex flex-col shadow-md p-10 bg-orange-600 items-center">
                            <h4 className="text-lg ">Revenue</h4>
                            <p className="font-bold text-xl">NRS {sellerRevenue }</p>
                        </div>
                    </div>
                    <div className="mt-10 w-full  flex justify-center">
                <LineGraph/>
            </div>
                </div>


            </div>


        </div>
    </>

    )
}

export default SellerDashboard