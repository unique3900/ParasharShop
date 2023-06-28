import React from 'react'
import NavBar from './Components/Layout/NavBar'
import Hero from './Components/Layout/Hero'
import Homepage from './Components/Layout/Homepage'
import { Route, Routes } from 'react-router-dom'
import Register from './Components/Auth/Register'
import Login from './Components/Auth/Login'
import SingleProductPage from './Components/Products/SingleProductPage'
import axios, { Axios } from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8080';
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <div>
      <NavBar />
  
      
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products/:id' element={<SingleProductPage/>} />
      </Routes>
    </div>
  )
}

export default App
