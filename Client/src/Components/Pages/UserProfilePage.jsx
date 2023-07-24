import React, {
    useEffect
} from 'react'
import {
    useDispatch,
    useSelector
} from 'react-redux'
import {
    fetchLoggedInUserInfoAsync,
    fetchLoggedInUserOrdersAsync,
    selectLoggedInUserInfo,
    selectLoggedInUserOrders,
    updateuserInfoAsync
} from '../../features/user/userSlice';
import {
    selectLoggedInUser
} from '../../features/Auth/authSlice';
import {
    Navigate
} from 'react-router-dom';

const UserProfilePage = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    const userInfo = useSelector(selectLoggedInUserInfo);
    const orders = useSelector(selectLoggedInUserOrders);


    const handleDelete = (e, id) => {
        e.preventDefault();
        const newUser = {
            ... user,
            addresses: [... user.addresses]
        };
        newUser.addresses.splice(id, 1);
        dispatch(updateuserInfoAsync(newUser))
    }


    useEffect(() => {
        dispatch(fetchLoggedInUserInfoAsync(user.id))
    }, [dispatch, user])


    return (
        <> {
            ! user && <Navigate to={'/login'}
                replace={true}></Navigate>
        }

            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5'>
                <h3 className="text-4xl font-bold text-center">Your Profile</h3>
                <div className=" mt-8 p-10">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold text-indigo-700 text-4xl">Name: {userInfo.fullName }</h1>
                            <h2 className="font-bold italic">Email: {userInfo.email }</h2>
                        </div>
                        <div className="">
                            <button className="px-3 py-2 cursor-pointer bg-green-600 text-white font-bold">New Address</button>
                        </div>
                    </div>


                    <p className="mt-4 font-bold underline">Saved Addresses</p>
                    {
                        userInfo.addresses.length < 1 ? <p className=' text-gray-500 text-center'>No Saved Address</p> : (
                            <div className="flex flex-col gap-5">
                            {
                            userInfo.addresses.map((item, index) => (
    
                                <div className='w-full flex flex-col lg:flex-row justify-start lg:justify-between bg-yellow-100 shadow-lg gap-3 lg:items-center p-5'>
                                    <div className="w-full  flex flex-col  gap-2 "
                                        key={index}>
                                        <label className='font-bold' htmlFor="">AddressLine {index}</label>
                                        <p className="">Address: {
                                            item.selectedState
                                        }&nbsp; {
                                            item.selectedCity
                                        }&nbsp; {
                                            item.selectedLocation
                                        } </p>
                                        <p className="">Street/House No. : {
                                            item.street
                                        }&nbsp; {
                                            item.houseNumber ? item.houseNumber : ""
                                        }</p>
                                        <p className="">Message:{
                                            item.message ? item.message : ""
                                        }</p>
                                        <p className="">Receiver: {
                                            item.fullName
                                        }({
                                            item.phone + '/' + item.email
                                        })</p>
                                    </div>
    
                                    <div className="flex flex-col gap-2">
                                        <button className='px-3 py-2 bg-green-600 text-white font-bold rounded-full w-full'>Edit</button>
                                        <button onClick={
                                                (e) => {
                                                    handleDelete(e, item.id)
                                                }
                                            }
                                            className='px-3 py-2 bg-red-600 text-white font-bold rounded-full w-full'>Delete</button>
                                    </div>
                                </div>
    
                            ))
                        } </div>
                        )
                    }

                </div>


            </div>
        </>

    )
}

export default UserProfilePage
