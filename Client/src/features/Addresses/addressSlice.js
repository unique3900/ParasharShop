import authSlice from "../Auth/authSlice";
import { addUserAddress, deleteUserAddress, fetchUserAddress, updateUserAddress } from "./addressApi";

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
    async () => {
        const response = await fetchUserAddress();
        return response.data.address;
    }
)
export const deleteUserAddressAsync = createAsyncThunk(
    "address/deleteUserAddress",
    async (id) => {
        const response = await deleteUserAddress(id);
        return response.data.address;
    }
)
export const updateUserAddressAsync = createAsyncThunk(
    "address/updateUserAddress",
    async (address) => {
        const response = await updateUserAddress(address);
        return response.data.address;
    }
)

export const resetAddressAsync = createAsyncThunk(
    "address/reset",
    async () => {
        return 'reset';
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
            .addCase(deleteUserAddressAsync.pending, (state) => {
                state.status="loading"
            })
            .addCase(deleteUserAddressAsync.fulfilled, (state,action) => {
                state.status = "idle";
                // state.addresses = action.payload;
                
            })
            .addCase(updateUserAddressAsync.pending, (state) => {
                state.status="loading"
            })
            .addCase(updateUserAddressAsync.fulfilled, (state, action) => {
                state.status = "idle";
                // state.addresses = action.payload;
                
            })
            .addCase(resetAddressAsync.pending, (state) => {
                state.status = "loading"
        })
            .addCase(resetAddressAsync.fulfilled, (state, action) => {
                state.status = "idle",
                    state.addresses = [null];
        })
            
    }
})

export const { } = addressSlice.actions;

export const selectUserAddress = (state) => state.address.addresses;

export default addressSlice.reducer;