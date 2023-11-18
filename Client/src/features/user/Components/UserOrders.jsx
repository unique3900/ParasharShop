import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectLoggedInUserOrders,
} from "../userSlice";
import { selectLoggedInUser } from "../../Auth/authSlice";
import { Link, Navigate } from "react-router-dom";
import { discountedPrice } from "../../../app/constants";
import {
  fetchProductByIdAsync,
  selectProductById,
} from "../../product/productListSlice";
const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectLoggedInUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
    console.log("User Orders",orders)
  }, [dispatch, user]);

  return (
    <>
      {" "}
      {!user && <Navigate to={"/login"} replace={true}></Navigate>}
      {!orders && <Navigate to={"/"} replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5">
        <h3 className="text-4xl font-bold text-center">Your Orders</h3>
        <div className="mt-8 p-10">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {orders.map((orders, index) => (
                <div key={index}>
                  <div className="flex flex-row items-center justify-between">
                    <p className="p-5 text-3xl font-bold text-purple-700 ">
                      Order id: #{index}
                    </p>
                  </div>
                  {orders.products.map((orderItems, i) => (
                    <li key={i} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={orderItems.product.thumbnail}
                          alt={"abc"}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <p> {orderItems.product.title}</p>
                            </h3>
                            <div className="flex flex-col justify-center gap-2">
                              <p className="ml-4">
                                NPR &nbsp;{" "}
                                {discountedPrice(orderItems.product) *
                                  orderItems.quantity}
                              </p>
                              <p
                                className={
                                  orderItems.status == "Pending"
                                    ? "ml-4 bg-indigo-600 text-white text-center"
                                    : orderItems.status == "Cancelled"
                                    ? "ml-4 bg-red-600 text-white text-center"
                                    : orderItems.status == "Shipped"
                                    ? "ml-4 bg-blue-600 text-white text-center"
                                    : orderItems.status == "Delivered"
                                    ? "ml-4 bg-green-600 text-white text-center"
                                    : ""
                                }
                              >
                                Status &nbsp; {orders.status}
                              </p>
                              <p className="ml-4">
                                Payment Method : {orders.selectedPaymentMethod}
                              </p>
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Color: {
                              "RED"
                            }
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex flex-col jc items-start gap-1">
                            <p className="text-gray-500">
                              Qty : {orderItems.quantity}
                            </p>
                            <p className="text-gray-500">
                              Address:
                              {orders.selectedDeliveryAddress.selectedState +" " +
                                orders.selectedDeliveryAddress.selectedCity +" " +
                                orders.selectedDeliveryAddress
                                  .selectedLocation +" " +
                                orders.selectedDeliveryAddress.street}
                            </p>
                            <p className="text-gray-500">
                              Receiver:{" "}
                              {orders.selectedDeliveryAddress.fullName}(
                              {orders.selectedDeliveryAddress.phone})
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
