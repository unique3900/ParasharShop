import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate, useNavigate } from 'react-router-dom';
import { selectLoggedInUserInfo } from '../../user/userSlice';

const Protected = ({ children }) => {
    const user = useSelector(selectLoggedInUserInfo);
    const navigate = useNavigate();
        if (!user) {
            // alert("Login to Continue")
            window.location.replace('/login');
        } else {
            return children
        }

}

export default Protected
