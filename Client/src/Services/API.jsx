import axios from 'axios'
import React from 'react'


const API = axios.create({baseURL:import.meta.env.VITE_REACT_APP_BASEURL})
API.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.authorization=`Bearer ${localStorage.getItem('token')}`
    }
    return req;
})
export default API
