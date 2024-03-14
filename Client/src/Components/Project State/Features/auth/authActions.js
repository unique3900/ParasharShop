import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../../../Services/API';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const userLogin = createAsyncThunk(
    '/api/v1/auth/login', //name
    async ({ email, password }, { rejectWithValue }) => {
   
        try {
            const { data } = await API.post('/api/v1/auth/login', { email, password })
            if (data.success) {
                toast.success(data.message + " Redirecting...");
                localStorage.setItem("token", data.token);
                window.location.replace('/');
            }
            else {
                toast.error(data.message);
                window.location.replace('/login');
            }
            return data;
        } catch (error) {
            if (error && error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            }
            else {
                return rejectWithValue(error.message);
            }
        }
    }
);


export const userRegister = createAsyncThunk(
    '/api/v1/register',
    async ({ fullName, email, password, address, phone, gender }, { rejectWithValue }) => {
        try {
          const {data}=  await API.post('/api/v1/auth/register', { fullName, email, password, address, phone,gender });
            if (data.success) {
                toast.success(data.message + " Redirecting...");
                window.location.replace('/login');
            }
            else {
                toast.error(data.message);
            }
            return data;
        } catch (error) {
            if (error && error.response &&error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            }

            else {
                return rejectWithValue(error.message);
            }
        }
    })
