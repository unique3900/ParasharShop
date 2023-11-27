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
import { FaBoxOpen, FaLocationArrow, FaKey,FaChartLine,FaRegChartBar   } from "react-icons/fa";
import { FaAnchorCircleCheck ,FaChartPie } from "react-icons/fa6";


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

        <div className='h-screen flex flex-col lg:justify-center items-center p-5 mt-10'>
            
            <div className="grid grid-rows-1 lg:grid-cols-[1fr_2fr] w-full h-full gap-3">

                <div className="flex flex-row  justify-around h-fit lg:flex-col gap-6 text-sm flex-wrap ">
                    <Link className='bg-gradient-to-br from-indigo-800 to-slate-600 text-white font-bold text-center px-3 py-4 flex justify-center gap-3 items-center text-md hover:scale-105 rounded-xl'>Manage Category <span><FaAnchorCircleCheck  size={24} /></span></Link>
                    <Link to={'manage-products'} className='bg-gradient-to-br from-indigo-800 to-slate-600 text-white font-bold text-center px-3 py-4 flex justify-center gap-3 items-center text-md hover:scale-105 rounded-xl '>Manage Products <span><FaBoxOpen size={24} /></span></Link>
                    <Link to={'manage-orders'} className='bg-gradient-to-br from-indigo-800 to-slate-600 text-white font-bold text-center px-3 py-4 flex justify-center gap-3 items-center text-md hover:scale-105 rounded-xl'>Manage Orders <span><FaLocationArrow  size={24} /></span></Link>
                    <Link className='bg-gradient-to-br from-indigo-800 to-slate-600 text-white font-bold text-center px-3 py-4 flex justify-center gap-3 items-center text-md hover:scale-105 rounded-xl'>Change Password <span><FaKey  size={24} /></span></Link>
                </div>
                <div className="h-screen mt-14 lg:mt-8 flex flex-col items-center justify-center  w-full">
                <h1 className="text-center font-bold text-4xl p-5">Seller Dashboard</h1>
            <p className='font-bold text-2xl text-black text-center'>Welcome,{seller.businessName }</p>
                    <div className="grid grid-rows-1 lg:grid-cols-[2fr_2fr_2fr] justify-between gap-10 p-10">
                        <div className=" flex mt-10 md:mt-0 flex-col  py-10 px-14 bg-gradient-to-br from-indigo-800 to-slate-600  rounded-lg shadow-2xl hover:scale-105 duration-100 ">
                            <FaRegChartBar   className=' text-white  ' size={40}/>
                            <h4 className=" text-white text-xl font-bold text-center mt-2">Total Products</h4>
                            <p className="font-bold text-xl text-white text-center">20</p>
                        </div>
                        <div className=" flex mt-10 md:mt-0 flex-col  py-10 px-14 bg-gradient-to-br from-indigo-800 to-slate-600  rounded-lg shadow-2xl hover:scale-105 duration-100 ">
                            <FaChartPie   className=' text-white  ' size={40}/>
                            <h4 className=" text-white text-xl font-bold text-center mt-2">Total Revenue</h4>
                            <p className="font-bold text-xl text-white text-center">20</p>
                        </div>
                        <div className=" flex mt-10 md:mt-0 flex-col  py-10 px-14 bg-gradient-to-br from-indigo-800 to-slate-600  rounded-lg shadow-2xl hover:scale-105 duration-100 ">
                            <FaChartLine   className=' text-white  ' size={40}/>
                            <h4 className=" text-white text-xl font-bold text-center mt-2">Orders Received</h4>
                            <p className="font-bold text-xl text-white text-center">20</p>
                        </div>
                        

                       
                    </div>
                    <div className="mt-10 w-[95%] h-full flex justify-center">
                <LineGraph/>
            </div>
                </div>


            </div>


        </div>
    </>

    )
}

export default SellerDashboard
