import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectLoggedInUserInfo,
  selectLoggedInUserOrders,
} from "../userSlice";
import { Link, Navigate } from "react-router-dom";
import { discountedPrice } from "../../../app/constants";
import {
  fetchProductByIdAsync,
  selectProductById,
} from "../../product/productListSlice";
import { selectLoggedInUserToken } from "../../Auth/authSlice";
import RatingForm from "../../../Components/Pages/RatingForm";
const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserInfo);
  const userToken = useSelector(selectLoggedInUserToken);
  const orders = useSelector(selectLoggedInUserOrders);

  const [userRating, setUserRating] = useState(0);



  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
    <>
      {" "}
      {!userToken && <Navigate to={"/login"} replace={true}></Navigate>}
      {!orders && <Navigate to={"/"} replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5">
        <h3 className="text-4xl font-bold text-center">Your Orders</h3>
        <div className="mt-8 p-10">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {orders?.map((data, index) => (
                <div key={index}>
                  <div className="flex flex-row items-center justify-between">
                    <p className="p-5 text-3xl font-bold text-purple-700 ">
                      Order id: #{index}
                    </p>
                    <p className="p-5 text-lg font-bold text-gray-600-700 underline">
                     Order Placed: {data.createdAt.slice(0,10)}
                    </p>
                  </div>
                  {data?.products?.map((orderItems, i) => (
                    <li key={i} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={`http://localhost:8080/uploads/${orderItems?.product?.thumbnail}` }
                          alt={"abc"}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>


                      <div className="ml-4 flex flex-1 flex-col">
                        
                        <div className="">
                          <div className="flex justify-between  text-base font-medium text-gray-900">
                            <h3>
                              <p> {orderItems?.product?.title}</p>
                            </h3>
                            <h5>
                              {orderItems.features.map((item, index) => (
                                
                                <p className="text-sm capitalize" key={index}><span className="font-bold">{item.title}: </span>{item.option} {console.log(item)}</p>
                              ))}
                              
                            </h5>


                            <div className="flex flex-col text-start items-center gap-2">
                              <p className="ml-4 text-start">
                                NPR &nbsp;{" "}
                                {discountedPrice(orderItems?.product) *
                                  orderItems?.quantity}
                              </p>
                              <p
                                className={
                                  orderItems?.status == "Pending"
                                    ? "px-2 ml-4 bg-indigo-600 text-white text-start"
                                    : orderItems?.status == "Cancelled"
                                    ? "px-2 ml-4 bg-red-600 text-white text-start"
                                    : orderItems?.status == "Shipped"
                                    ? "px-2 ml-4 bg-blue-600 text-white text-start"
                                    : orderItems?.status == "Delivered"
                                    ? " ml-4 bg-green-600 text-white text-start"
                                    : ""
                                }
                              >
                                Status &nbsp; {orderItems.status}
                              </p>
                              <p className="ml-4 text-start">
                                Payment Method : {data?.selectedPaymentMethod}
                              </p>
                           
                              
                              {orderItems.status == "Delivered" && orderItems.rated==false ? (
                                <RatingForm id={orders[index]?.id} productId={orderItems?.product?.id} userRating={userRating} setUserRating={setUserRating} />
                              ):""}
                            </div>
                          </div>
                          <p className="-mt-8 text-sm text-gray-500">
                            Color: {
                              "RED"
                            }
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex flex-col jc items-start gap-1">
                            <p className="text-gray-500">
                              Qty : {orderItems?.quantity}
                            </p>
                            <p className="text-gray-500">
                              Address:
                              {data?.selectedDeliveryAddress?.selectedState +" " +
                                data?.selectedDeliveryAddress?.selectedCity +" " +
                                data?.selectedDeliveryAddress
                                  ?.selectedLocation +" " +
                                  data?.selectedDeliveryAddress?.street}
                            </p>
                            <p className="text-gray-500">
                              Receiver:{" "}
                              {data?.selectedDeliveryAddress?.fullName}(
                              {data?.selectedDeliveryAddress?.phone})
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}{" "}
                </div>
              ))}{" "}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrders;
