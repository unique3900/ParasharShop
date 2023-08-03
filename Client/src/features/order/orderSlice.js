import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOrderForSeller, newOrder, updateOrder} from "./orderApi";

const initialState = {
  status: "idle",
  orders: [],
  Currentorder: null,
  sellerOrder:[],
};


export const newOrderAsync = createAsyncThunk(
  "order/newOrder",
  async (order) => { 
    const response = await newOrder(order);
    return response.data;
  }
);
export const fetchOrderForSellerAsync = createAsyncThunk(
  "order/fetchOrderForSeller",
  async (id) => { 
    const response = await fetchOrderForSeller(id);
    console.log(response.data)
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (data) => { 
    const response = await updateOrder(data);
    console.log(response.data)
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
    .addCase(fetchOrderForSellerAsync.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchOrderForSellerAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.sellerOrder = action.payload;
    })
    .addCase(updateOrderAsync.pending, (state) => {
      state.status = "loading";
    })
    .addCase(updateOrderAsync.fulfilled, (state, action) => {
      state.status = "idle";
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      state.orders[index] = action.payload;
    })
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.Currentorder;
export const selectSellerOrder = (state) => state.order.sellerOrder;
export default orderSlice.reducer;
