import React, {
    useEffect, useState
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
    selectSellerOrder,
    updateOrderAsync
} from '../../../features/order/orderSlice';
import { discountedPrice } from '../../../app/constants';
import { AiOutlineEdit,AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Pagination from '../../Layout/Pagination';
const OrderManage = () => {
    const seller = useSelector(selectLoggedInSeller);
    const sellerOrders = useSelector(selectSellerOrder);
    const dispatch = useDispatch();


    const [editable, setEditable] = useState(-1);
    const [page, setPage] = useState(1);
    const handleShow = (order) => {
        
    }
    const handleEdit = (e, order,index, id) => {
        const data = { value: e.target.value,index:index, id: id, order }
        dispatch(updateOrderAsync(data))
        setEditable(-1);
    }
    useEffect(() => {
        dispatch(fetchOrderForSellerAsync(seller.id))
    }, [dispatch,editable])

    return (
        <> {/* component */}
            <div className="overflow-scroll">
                <h2 className="text-center font-bold text-4xl p-3">Manage Orders</h2>
                <div className=" bg-gray-100 w-full flex  items-center justify-center font-sans overflow-hidden">
                    <div className="overflow-auto no-scrollbar">
                        <div className=" bg-white w-screen min-w-max lg:min-w-fit lg:w-fit shadow-md rounded my-6 p-5">
                            <table className=" table-auto">
                                <thead className=''>
                                    <tr className="bg-gray-200  text-gray-600 uppercase text-sm leading-normal ">
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
                                    sellerOrders.slice(page*12-12,page*12).map((item, index) => (
                                        <tr key={
                                                item.id
                                            }
                                            className="border-b border-gray-200 hover:bg-gray-100">


                                           
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <div className="flex flex-col items-center justify-center">

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


                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                <div className="flex flex-col items-center ">

                                                    <span className="font-medium text-xs">
                                                        {
                                                        item.selectedDeliveryAddress.fullName
                                                    }</span>
                                                    <span className="font-medium text-xs">
                                                        {
                                                        item.selectedDeliveryAddress.email
                                                    }</span>
                                                    <span className="font-medium text-xs">
                                                        {
                                                        item.selectedDeliveryAddress.phone
                                                    }</span>
                                                    <span className="font-medium text-xs">
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
                                                <div className="flex flex-col gap-5 items-center justify-center">

                                                    {item.items.map((prod,index) => (
                                                         <span key={index}  className="font-medium">
                                                          {discountedPrice(prod)}
                                                        </span>
                                                    ))}

                                                </div>
                                            </td>

                                            {item.items.map((prod, index) => (
                                                <td key={index} className="py-3 px-6 flex flex-col text-center  whitespace-nowrap">
                                                                                            <div className="flex flex-col items-center justify-center">
                                            
                                                                                                {
                                                                                               seller.id==prod.seller &&  editable==item.id? (
                                                                                                        <select defaultValue={prod.status} onChange={(e)=>handleEdit(e,item,index,item.id)} className='bg-purple-200 rounded-full text-xs text-purple-700'>
                                                                                                        <option value="Pending">Pending</option>
                                                                                                        <option value="Shipped">Shipped</option>
                                                                                                        <option value="Delivered">Delivered</option>
                                                                                                        <option value="Cancelled">Cancelled</option>
                                                                                                   </select>
                                                                                                    ) : <p className={ prod.status=="Pending"?"bg-purple-700 text-white p-1":prod.status=="Cancelled"? "bg-red-700 text-white p-1":prod.status=="Shipped"?"bg-indigo-700 text-white p-1":prod.status=="Delivered"?"bg-green-700 text-white p-1":"" }>{prod.status }</p>
                                                                                                }
                                            
                                                                                            </div>
                                                                                        </td>
                                            ))}


                                            <td className="py-3 px-6 text-center  whitespace-nowrap">
                                                <div className="flex flex-row gap-2 items-center justify-center">
                                                        
                                                    <AiOutlineEdit  onClick={() => { setEditable(item.id) }} className='w-6 h-6 cursor-pointer' />
                                                 
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    } </tbody>
                                
                              
                            </table>
                           
                        </div>
                        <Pagination page={Math.ceil(page)} setPage={setPage} totalPage={Math.floor(sellerOrders.length)} />
                    </div>
                </div>
            </div>
        </>

    )
}

export default OrderManage
