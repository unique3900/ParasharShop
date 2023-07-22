import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newOrder} from "./orderApi";

const initialState = {
  status: "idle",
  orders: [],
  Currentorder:null
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
    resetOrder: (state) => {
      state.Currentorder = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(newOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.Currentorder = action.payload;
      }
    )
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.Currentorder;
export default orderSlice.reducer;
