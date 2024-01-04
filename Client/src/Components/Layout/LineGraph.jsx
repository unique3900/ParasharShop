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
  const orderMonths=useSelector(selectOrderMonths)
  const labels = useSelector(selectLabels);
    const [monthelyProduct,setMonthelyProduct] = useState([]);
    const [orderMonthely,setOrderMonthely] = useState([]);

  const fetchMonthelyOrder = async () => {
console.log(monthelyProducts)
    const newArray = [];
    console.log(labels)
    for (let index = 0; index < labels.length; index++){
      if (labels.includes(orderMonths[index])) {
    
       const ind = labels.indexOf(orderMonths[index])
      console.log(index, orderMonths[index])
       orderMonths[index] ? newArray[ind] = monthelyProducts[index] : newArray[index] = 0;
      }
    }
     setOrderMonthely(newArray)
    console.log(monthelyProducts)
  }
    const data = {
        labels,
        datasets: [
          {
            label: 'Orders',
            data: orderMonthely,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Products',
            data: monthelyProducts,
            borderColor: 'rgb(115, 99, 255)',
            backgroundColor: 'rgba(172, 99, 255, 0.5)',
          },
        ],
    };
  useEffect(() => {
    dispatch(fetchMonthelyOrderAsync(seller?.id))
    fetchMonthelyOrder();
    dispatch(fetchMonthelyProductsAync(seller?.id))
  }, [dispatch])
  return (
    <div className='flex flex-col justify-center w-full'>
      <Line className='w-[10%]'  options={options} data={data} />
    </div>
    
  )
}

export default LineGraph
