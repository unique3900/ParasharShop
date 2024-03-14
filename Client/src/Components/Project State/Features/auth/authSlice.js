import { createSlice } from "@reduxjs/toolkit";
import { userLogin, userRegister } from "./authActions";


const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
const initialState = {
    user: null,
    token,
    error: null,
    loading:false
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        // For User Login
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true,
            state.error = null
        })
            builder.addCase(userLogin.fulfilled, (state, {payload}) => {
                
                state.loading = false;
                state.error = false;
                state.user = payload.fetchData;
                state.token = payload.token;
            })
            builder.addCase(userLogin.rejected, (state,{payload}) => {
                state.loading = false,
                state.error = payload
            })  
        
        
        ///For User Register

        builder.addCase(userRegister.pending, (state) => {
            state.loading = true,
            state.error = null
        })
            builder.addCase(userRegister.fulfilled, (state, {payload}) => {
                state.loading = false;
                state.error = false;
                state.user = "";
            })
            builder.addCase(userRegister.rejected, (state,{payload}) => {
                state.loading = false,
                    state.error = payload.fetchData;
            })  
    }
});

export default authSlice;
