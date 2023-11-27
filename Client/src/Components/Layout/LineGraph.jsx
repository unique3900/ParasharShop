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
import { selectLoggedInSeller } from '../../features/Auth/authSlice';
import 'chartjs-plugin-zoom';
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
            mode: 'x',
          },
          pan: {
            enabled: true,
            mode: 'x',
          },
    },
  };








const LineGraph = () => {

    const seller = useSelector(selectLoggedInSeller);

    const [monthelyOrder, setMonthelyOrder] = useState([])
    const [monthelyProduct, setMonthelyProduct] = useState([])
    const [labels, setLabels] = useState([]);
    const [labels2, setLabels2] = useState([]);

    const fetchMonthelyOrder = async() => {
        const { data } = await axios.get(`http://localhost:8080/orders/sellers/total-orders/${seller.id}`);
        setLabels(data.months)
        setMonthelyOrder(data.orders)
  }
  
  const fetchMonthelyProducts = async () => {
    const {data}=await axios.get(`http://localhost:8080/products/seller/total-product/${seller.id}`)
    setMonthelyProduct(data.products)
    setLabels2(data.months)
  }

    useEffect(() => {
      fetchMonthelyOrder();
      fetchMonthelyProducts();
    }, [])
    const data = {
        labels,
        datasets: [
          {
            label: 'Orders',
            data: monthelyOrder,
          
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
    };
    const data2 = {
        labels:labels2,
        datasets: [
          {
            label: 'Products',
            data: monthelyProduct,
            borderColor: 'rgb(115, 99, 255)',
            backgroundColor: 'rgba(172, 99, 255, 0.5)',
          },
        ],
    };
    

    
  
//   useEffect(() => {
//   fetchMonthlyOrder()
//       console.log(monthelyOrder)
//       console.log("mm",months)
//   }, [])
  return (
    <div className='flex flex-col justify-center w-full'>
      <Line className='w-[10%]'  options={options} data={data} />
      <Line className='w-[10%]' options={options} data={data2} />
    </div>
    
  )
}

export default LineGraph
