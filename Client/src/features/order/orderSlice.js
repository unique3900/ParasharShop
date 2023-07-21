import { addListener, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, getCartByUserEmail, newOrder, removeFromCart, updateCart } from "./orderApi";

const initialState = {
  status: "idle",
  orders: [],
};


export const newOrderAsync = createAsyncThunk(
  "order/newOrder",
  async (items) => { 
    const response = await newOrder(items);
    return response.data;
  }
);
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
      }
    )
  },
});

export const {  } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export default orderSlice.reducer;
