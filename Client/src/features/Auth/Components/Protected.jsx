import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import { selectLoggedInUserInfo } from '../../user/userSlice';
import { selectLoggedInUserToken } from '../authSlice';

const Protected = ({ children }) => {
    const user = useSelector(selectLoggedInUserInfo);
    const userToken = useSelector(selectLoggedInUserToken);
    
    const navigate = useNavigate();
        if (!userToken) {
            // alert("Login to Continue")
            window.location.replace('/login');
        } else {
            return children
        }

}

export default Protected
