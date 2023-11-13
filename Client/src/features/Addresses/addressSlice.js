import authSlice from "../Auth/authSlice";
import { addUserAddress, fetchUserAddress } from "./addressApi";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    addresses: [],
    status: "idle",
    selectedAddress:null
}

export const addUserAddressAsync = createAsyncThunk(
    "address/addUserAddress",
    async (address) => {
        const response = await addUserAddress(address);
        
        return response.data.address;
    }
)

export const fetchUserAddressAsync = createAsyncThunk(
    "address/fetchUserAddress",
    async (id) => {
        const response = await fetchUserAddress(id);
        return response.data.address;
    }
)

export const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        increment: (state) => {
          state.value += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUserAddressAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addUserAddressAsync.fulfilled, (state, action) => {
                state.status = "idle";
            })
            .addCase(fetchUserAddressAsync.pending, (state) => {
            state.status="loading"
            })
            .addCase(fetchUserAddressAsync.fulfilled, (state, action) => {
                state.status = "idle";
                console.log("User Address Payload", action.payload);
                state.addresses=action.payload;
        })
    }
})

export const { } = addressSlice.actions;

export const selectUserAddress = (state) => state.address.addresses;

export default addressSlice.reducer;