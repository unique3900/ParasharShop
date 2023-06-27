import React from 'react'
import NavBar from './Components/Layout/NavBar'
import Hero from './Components/Layout/Hero'
import Homepage from './Components/Layout/Homepage'
import { Route, Routes } from 'react-router-dom'
import Register from './Components/Auth/Register'
import Login from './Components/Auth/Login'

const App = () => {
  return (
    <div>
      <NavBar />
  
      
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App
