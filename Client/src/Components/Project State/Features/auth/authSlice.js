import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    error: null,
    loading:false
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        
    },
    extraReducers:{}
});

export default authSlice;
