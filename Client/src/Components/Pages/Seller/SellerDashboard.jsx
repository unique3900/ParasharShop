import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  fetchLoggedInSellerAsync,
  selectLoggedInSeller,
} from "../../../features/Auth/authSlice";
import { fetchLoggedInUserInfo } from "../../../features/user/userAPI";
import LineGraph from "../../Layout/LineGraph";
import { selectLoggedInUserInfo } from "../../../features/user/userSlice";
import {
  fetchProductBySellerIdAsync,
  sellerProducts,
} from "../../../features/product/productListSlice";
import {
  fetchOrderForSellerAsync,
  selectSellerOrder,
} from "../../../features/order/orderSlice";
import { FaBoxOpen } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FaRegArrowAltCircleRight } from "react-icons/fa";


const SellerDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserInfo);
  const seller = useSelector(selectLoggedInSeller);
  const products = useSelector(sellerProducts);
  const orders = useSelector(selectSellerOrder);
  // const [sellerRevenue, setSellerRevenue] = useState(0);

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
            ? (product.product.price *
                (100 - product.product.discountPercentage)) /
              100
            : product.product.price;

          // Add the price to total revenue
          totalRevenue += discountedPrice * product.quantity;
        }
      });
    });

    return totalRevenue;
  }
  const sellerRevenue = Math.ceil(
    calculateTotalRevenue(orders, targetSellerId)
  );

  useEffect(() => {
    dispatch(fetchLoggedInSellerAsync());
    dispatch(fetchProductBySellerIdAsync(seller?.id));
    dispatch(fetchOrderForSellerAsync(seller?.id));
  }, [dispatch, user]);

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center lg:justify-start p-5 mt-[25rem] lg:mt-10">
        <div className="grid grid-cols-1  lg:grid-cols-[1fr_2fr]  w-full  gap-3">
          <div className="flex flex-row justify-center mt-4 h-fit lg:flex-col gap-2 text-sm flex-wrap">
            <Link
              to={"manage-products"}
              className="relative bg-violet-700 text-white font-bold text-center px-3 py-4 flex flex-row justify-center gap-6 items-center"
            >
              Manage Products  <span className="absolute right-28 hidden lg:flex"><FaRegArrowAltCircleRight size={28}/></span>
            </Link>
            <Link
              to={"manage-orders"}
              className="relative bg-violet-700 text-white font-bold text-center px-3 py-4 flex flex-row justify-center gap-6 items-center"
            >
              Manage Orders <span className="absolute right-28  hidden lg:flex"><FaRegArrowAltCircleRight size={28}/></span>
            </Link>
            <Link
              to={"change-password"}
              className="relative bg-violet-700 text-white font-bold text-center px-3 py-4 flex flex-row justify-center gap-6 items-center"
            >
              Change Business Password <span className="absolute right-28  hidden lg:flex"><FaRegArrowAltCircleRight size={28}/></span>
            </Link>
          </div>
          <div className="h-full flex flex-col items-center justify-center w-full">
            <div className="flex flex-col lg:-mt-10">
              <h1 className="text-center font-bold text-4xl p-5">
                Seller Dashboard
              </h1>
              <p className="font-bold text-xl text-purple-600 text-center">
                Welcome,{seller.businessName}
              </p>
            </div>
            <div className="flex flex-row flex-wrap justify-center gap-10 p-10 ">
                          <div className="flex flex-col shadow-md p-10 bg-pink-400 items-center min-w-[250px] text-white  bg-gradient-to-br from-indigo-600 to-slate-700">
                          <FaBoxOpen size={50}/>
                <h4 className="text-2xl">Total Products</h4>
                <p className="font-bold text-xl">{products?.length}</p>
              </div>

                          <div className="flex flex-col shadow-md p-10 bg-teal-400 items-center  min-w-[250px] text-white bg-gradient-to-br from-indigo-600 to-slate-700">
                              <TbTruckDelivery size={50}/>
                <h4 className="text-2xl ">Total Orders</h4>
                <p className="font-bold text-xl">{orders?.length}</p>
              </div>

                          <div className="flex flex-col shadow-md p-10 bg-orange-600 items-center  min-w-[250px] text-white bg-gradient-to-br from-indigo-600 to-slate-700">
                          <RiMoneyDollarCircleLine size={50}/>
                <h4 className="text-2xl ">Revenue</h4>
                <p className="font-bold text-xl">NRS {sellerRevenue}</p>
              </div>
            </div>
            <div className=" w-full mt-0 lg:-mt-32  flex justify-center">
              <LineGraph />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerDashboard;
