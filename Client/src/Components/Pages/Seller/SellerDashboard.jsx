import React, { useEffect } from 'react'
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
    selectLoggedInSeller,
    selectLoggedInUser
} from '../../../features/Auth/authSlice';
import { fetchLoggedInUserInfo } from '../../../features/user/userAPI';
import LineGraph from '../../Layout/LineGraph';
const SellerDashboard = () => {
    const dispatch = useDispatch();
        const user = useSelector(selectLoggedInUser);
        const seller = useSelector(selectLoggedInSeller);

    
    // useEffect(() => {
    //     dispatch(fetchLoggedInSellerAsync(user.id))
    // }, [dispatch,user])
    
    return (<>
        {/* {
            ! user && <Navigate to={'/sellerOptions'}></Navigate>
        } */}
            {/* {
            ! seller &&< Navigate to = {
                '/sellerOptions'
            } >
        </Navigate>} */}

        <div className='h-screen flex flex-col lg:justify-center items-center p-5'>
            <h1 className="text-center font-bold text-4xl p-5">Seller Dashboard</h1>
            <p className='font-bold text-xl text-purple-600 text-center'>Welcome,{seller.businessName }</p>
            <div className="grid grid-rows-1 lg:grid-cols-[1fr_2fr] w-full h-full gap-3">

                <div className="flex flex-row h-fit lg:flex-col gap-2 text-sm flex-wrap">
                    <Link className='bg-red-700 text-white font-bold text-center px-3 py-2'>Manage Category</Link>
                    <Link to={'manage-products'} className='bg-purple-700 text-white font-bold text-center px-3 py-2'>Manage Products</Link>
                    <Link to={'manage-orders'} className='bg-blue-700 text-white font-bold text-center px-3 py-2'>Manage Orders</Link>
                    <Link className='bg-green-700 text-white font-bold text-center px-3 py-2'>Change Business Password</Link>
                </div>
                <div className="h-full flex flex-col items-center justify-center shadow-lg w-full">
                    <div className="grid grid-rows-1 lg:grid-cols-[2fr_2fr_2fr] justify-between gap-10 p-10">
                        <div className="flex flex-col shadow-md p-10 bg-pink-400 items-center ">
                            <h4 className="text-lg">Total Products</h4>
                            <p className="font-bold text-xl">20</p>
                        </div>

                        <div className="flex flex-col shadow-md p-10 bg-teal-400 items-center">
                            <h4 className="text-lg ">Total Sales</h4>
                            <p className="font-bold text-xl">20</p>
                        </div>

                        <div className="flex flex-col shadow-md p-10 bg-orange-600 items-center">
                            <h4 className="text-lg ">Revenue</h4>
                            <p className="font-bold text-xl">20</p>
                        </div>
                    </div>
                    <div className="mt-10 w-full h-full flex justify-center">
                <LineGraph/>
            </div>
                </div>


            </div>


        </div>
    </>

    )
}

export default SellerDashboard
