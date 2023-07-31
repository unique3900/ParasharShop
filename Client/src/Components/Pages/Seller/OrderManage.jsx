import React, {
    useEffect
} from 'react'
import {
    useDispatch,
    useSelector
} from 'react-redux'
import {
    selectLoggedInSeller
} from '../../../features/Auth/authSlice'
import {
    fetchOrderForSellerAsync,
    selectSellerOrder
} from '../../../features/order/orderSlice';

const OrderManage = () => {
    const seller = useSelector(selectLoggedInSeller);
    const sellerOrders = useSelector(selectSellerOrder);
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(fetchOrderForSellerAsync(seller.id))
        console.log(sellerOrders)
    }, [dispatch, seller])

    return (
        <> {/* component */}
            <div className="overflow-x-auto">
                <h2 className="text-center font-bold text-4xl p-3">Manage Orders</h2>
                <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
                    <div className="w-full">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-left">Order Id</th>
                                        <th className="py-3 px-6 text-left">Items</th>
                                        <th className="py-3 px-6 text-center">Product Detail</th>
                                        <th className="py-3 px-6 text-center">Shipping</th>
                                        <th className="py-3 px-6 text-center">Total Amount</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {
                                    sellerOrders.map((item, index) => (
                                        <tr key={
                                                item.id
                                            }
                                            className="border-b border-gray-200 hover:bg-gray-100">


                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <div className="flex items-center justify-center">

                                                    <span className="font-medium">
                                                       # {
                                                        item.id
                                                    }</span>
                                                </div>
                                            </td>


                                            <td className="py-3 px-6 text-center  whitespace-nowrap">
                                                <div className="flex flex-col items-center justify-center">

                                                    <span className="font-medium">
                                                        {
                                                        item.totalItems
                                                    }</span>
                                                </div>
                                            </td>
                                            {
                                            item.items.map((prod) => (
                                                <div key={
                                                        prod.id
                                                    }
                                                    className='flex flex-col items-center justify-center'>


                                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <img className='w-10 h-10'
                                                                src={
                                                                    prod.thumbnail
                                                                }
                                                                alt=""/>
                                                            <span className="font-medium">
                                                                {
                                                                prod.title
                                                            }
                                                                (Quantity:{
                                                                prod.quantity
                                                            })
                                                            </span>
                                                        </div>
                                                    </td>


                                                </div>
                                            ))
                                        }


                                            <td className="py-3 px-6 text-center  whitespace-nowrap">
                                                <div className="flex flex-col items-center ">

                                                    <span className="font-medium">
                                                        {
                                                        item.selectedDeliveryAddress.fullName
                                                    }</span>
                                                    <span className="font-medium">
                                                        {
                                                        item.selectedDeliveryAddress.email
                                                    }</span>
                                                    <span className="font-medium">
                                                        {
                                                        item.selectedDeliveryAddress.phone
                                                    }</span>
                                                    <span className="font-medium">
                                                        {
                                                        item.selectedDeliveryAddress.selectedState
                                                    }  &nbsp;
                                                        {
                                                        item.selectedDeliveryAddress.selectedCity

                                                    } &nbsp;
                                                        {
                                                        item.selectedDeliveryAddress.selectedLocation

                                                    } &nbsp;
                                                        {
                                                        item.selectedDeliveryAddress.street

                                                        }&nbsp;
                                                                                                            {
                                                        item.selectedDeliveryAddress.houseNumber

                                                    }</span>


                                                </div>
                                            </td>

                                            <td className="py-3 px-6 text-center  whitespace-nowrap">
                                                <div className="flex flex-col items-center justify-center">

                                                    <span className="font-medium">
                                                        {
                                                        item.totalAmount
                                                    }</span>
                                                </div>
                                            </td>

                                            <td className="py-3 px-6 text-center  whitespace-nowrap">
                                                <div className="flex flex-col items-center justify-center">

                                                    <span className="font-medium">
                                                        {
                                                        item.status
                                                    }</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                } </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default OrderManage
