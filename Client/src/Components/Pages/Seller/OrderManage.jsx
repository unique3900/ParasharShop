import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInSeller } from "../../../features/Auth/authSlice";
import {
  fetchOrderForSellerAsync,
  selectSellerOrder,
  updateOrderAsync,
} from "../../../features/order/orderSlice";
import { discountedPrice } from "../../../app/constants";
import { AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Pagination, { MiniPagination } from "../../Layout/Pagination";

const OrderManage = () => {
  const seller = useSelector(selectLoggedInSeller);
  const sellerOrders = useSelector(selectSellerOrder);
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(-1);
  const [page, setPage] = useState(1);
  const handleShow = (order) => { };
  
  const handleEdit = (id,value,productId) => {
    console.log(id, value, productId)
    const data = { id, value, productId }
    dispatch(updateOrderAsync(data))
  };
  useEffect(() => {
    dispatch(fetchOrderForSellerAsync(seller.id));
  }, []);

  return (
    <>
      {" "}
      {/* component */}
      <div className="">
        <h2 className="text-center font-bold text-4xl p-3">Manage Orders</h2>
        <div className=" bg-gray-100 w-full flex  items-center justify-center font-sans overflow-hidden">
          <div className="overflow-auto">
            <div className=" bg-white w-screen min-w-max lg:min-w-fit lg:w-fit shadow-md rounded my-6 p-5">
              <table className=" table-auto overflow-y-auto-auto">
                <thead className="">
                  <tr className="bg-gray-200  text-gray-600 uppercase text-sm leading-normal ">
                    <th className="py-3 px-6 text-left">Order Id</th>
                    <th className="py-3 px-6 text-left">Order Placed</th>
                    <th className="py-3 px-6 text-left">Items In This Order</th>
                    <th className="py-3 px-6 text-center">Product Detail</th>
                    <th className="py-3 px-6 text-center">Shipping</th>
                    <th className="py-3 px-6 text-center">Order Total</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    {/* <th className="py-3 px-6 text-center">Actions</th> */}
                  </tr>
                </thead>

                <tbody className="text-gray-600 text-sm font-light">
                  {sellerOrders.slice(page * 4 - 4, page * 4).map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <>

                          <td className="py-3 px-6 text-center whitespace-nowrap">
                            <div className="flex flex-col items-center justify-center">
                              <span className="font-medium"># {index+1}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center whitespace-nowrap">
                            <div className="flex flex-col items-center justify-center">
                              <span className="font-medium">{item.createdAt.slice(0,10)}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center  whitespace-nowrap">
                            <div className="flex flex-col items-center justify-center">
                              <span className="font-medium">
                                {item.products.length}
                              </span>
                            </div>
                          </td>

                          {item.products.map((data, ind) => (
                            <div className="flex flex-col items-center justify-center">
                              <td className="py-3 px-6 text-center whitespace-nowrap">
                                {data.seller == seller.id ? (
                                  <div className="flex flex-col items-center justify-center">
                                    <img
                                      className="w-10 h-10"
                                      src={ `http://localhost:8080/uploads/${data.product.thumbnail}`}
                                  
                                      alt=""
                                    />
                                    <span className="font-medium">
                                      {data.product.title}
                                      (Quantity: {data.quantity})
                                    </span>
                                    {data.features.map((item, index) => (
                                      <p key={index} className="text-sm text-black capitalize">
                                        <span className="font-bold">{item.title}: </span>
                                      {item.option}
                                    </p>
                                    ))}
                                    
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </td>
                            </div>
                          ))}
                          <td className="py-3 px-6 text-center whitespace-nowrap">
                            
                                <div className="flex flex-col items-center ">
                                <span className="font-medium text-xs">
                                  {item.selectedDeliveryAddress.fullName}
                                </span>
                                <span className="font-medium text-xs">
                                  {item.selectedDeliveryAddress.email}
                                </span>
                                <span className="font-medium text-xs">
                                  {item.selectedDeliveryAddress.phone}
                                </span>
                                <span className="font-medium text-xs">
                                  {item.selectedDeliveryAddress.selectedState}{" "}
                                  &nbsp;
                                  {item.selectedDeliveryAddress.selectedCity}{" "}
                                  &nbsp;
                                  {
                                    item.selectedDeliveryAddress.selectedLocation
                                  }{" "}
                                  &nbsp;
                                  {item.selectedDeliveryAddress.street}&nbsp;
                                  {item.selectedDeliveryAddress.houseNumber}
                                </span>
                                <span className="bg-teal-500 px-3 py-2 mt-2 font-bold text-white">
                                  Payment:{item.selectedPaymentMethod}
                                </span>
                              </div>
                              

                          </td>

                          <td className="py-3 px-6 text-center  whitespace-nowrap">
                            
                            
                                <div className="flex flex-col gap-5 items-center justify-center">
                                <span className="font-medium">
                                  {item.totalAmount}
                                </span>
                              </div>
                             
                            

                          </td>
                          {item.products.map((data, ind) => (
                            <td className="py-3 px-6 flex flex-col text-center  whitespace-nowrap">
                              {data.seller == seller.id ? (
                                <div className="flex flex-col items-center justify-center">
                                  <select
                                    className="bg-purple-200 rounded-full text-xs text-purple-700"
                                    defaultValue={data.status}
                                    onChange={(e) => {
                                      e.preventDefault();
                                      handleEdit(item.id,e.target.value,data.product.id)
                                    }}
                                  >
                                    <option value="Pending" >Pending</option>
                                    <option value="Shipped" >Shipped</option>
                                    <option value="Delivered" >Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                  </select>
                                </div>
                              ) : (
                                <></>
                              )}
                            </td>
                          ))}

                          {/* <td className="py-3 px-6 text-center  whitespace-nowrap">
                            
                                <div className="flex flex-row gap-2 items-center justify-center">
                                <AiOutlineEdit className="w-6 h-6 cursor-pointer" />
                              </div>
                              

                          </td> */}
                        </>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <MiniPagination
              page={Math.ceil(page)}
              setPage={setPage}
              totalPage={Math.floor(sellerOrders.length)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderManage;
