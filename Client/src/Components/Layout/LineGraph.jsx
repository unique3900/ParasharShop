import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import faker from 'faker';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInSellerAsync, selectLoggedInSeller } from '../../features/Auth/authSlice';
import 'chartjs-plugin-zoom';
import { fetchMonthelyOrderAsync, selectMonthelyOrder, selectOrderMonths } from '../../features/order/orderSlice';
import { fetchLoggedInUserInfo } from '../../features/user/userAPI';
import { fetchMonthelyProductsAync, selectLabels, selectMonthelyProduct } from '../../features/product/productListSlice';
import { selectLoggedInUserInfo } from '../../features/user/userSlice';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
); 
export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Yearly Chart',
        },
        zoom: {
            enabled: true,
            mode: 'y',
          },
          pan: {
            enabled: true,
            mode: 'x',
          },
    },
  };
const LineGraph = () => {
  const user = useSelector(selectLoggedInUserInfo);
  const dispatch = useDispatch();
    const seller = useSelector(selectLoggedInSeller);
  const monthelyOrder = useSelector(selectMonthelyOrder);
  const monthelyProducts = useSelector(selectMonthelyProduct)
  const orderMonths = useSelector(selectOrderMonths);
  const labels = useSelector(selectLabels);

  
    const orderdata = {
        labels:orderMonths,
        datasets: [
          {
            label: 'Orders',
            data: monthelyOrder,
            borderColor: 'rgb(254, 10, 230)',
            backgroundColor: 'rgba(132, 6, 65, 0.5)',
          },
        ],
  };

  const productdata = {
    labels,
    datasets: [
      {
        label: 'products',
        data: monthelyProducts,
        borderColor: 'rgb(14, 29, 244)',
        backgroundColor: 'rgba(20, 44, 179, 0.5)',
      },

    ],
};
  
  useEffect(() => {
    dispatch(fetchMonthelyOrderAsync(seller?.id))
    dispatch(fetchMonthelyProductsAync(seller?.id))
  }, [dispatch])
  return (
    <div className='flex flex-col   justify-center w-full   lg:mt-[6rem] '>
      <Line className='w-[10%]'  options={options} data={productdata} />
      <Line className='w-[10%]'  options={options} data={orderdata} />
    </div>
    
  )
}

export default LineGraph
