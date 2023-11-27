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
    const [labels, setLabels] = useState([]);

    const fetchMonthelyOrder = async() => {
        const { data } = await axios.get(`http://localhost:8080/orders/sellers/total-orders/${seller.id}`);
        setLabels(data.months)
        setMonthelyOrder(data.orders)
    }

    useEffect(() => {
        fetchMonthelyOrder();
        console.log(labels,monthelyOrder)
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
          {
            label: 'Products for Sale',
            data: [10,3,5,6],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    };
    

    
  
//   useEffect(() => {
//   fetchMonthlyOrder()
//       console.log(monthelyOrder)
//       console.log("mm",months)
//   }, [])
  return (
    <Line  options={options} data={data} />
  )
}

export default LineGraph
