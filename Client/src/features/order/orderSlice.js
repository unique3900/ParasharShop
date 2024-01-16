import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMonthelyOrder, fetchOrderForSeller, newOrder, orderByCard, updateOrder, updateRatingStatus} from "./orderApi";

const initialState = {
  status: "idle",
  orders: [],
  Currentorder: null,
  sellerOrder: [],
  monthelyOrder: [],
  orderMonths:[]
};
export const newOrderAsync = createAsyncThunk(
  "order/newOrder",
  async (order) => { 
    const response = await newOrder(order);
    return response.data;
  }
);
//When user proceeds with card then we need to set the current order
export const orderByCardAsync = createAsyncThunk(
  'order/card-payment',
  async (order) => {
    const response = await orderByCard(order);
    return response.data.order;
  }
)
export const fetchOrderForSellerAsync = createAsyncThunk(
  "order/fetchOrderForSeller",
  async (id) => { 
    const response = await fetchOrderForSeller(id);
    console.log(response.data.order)
    return response.data.order;
  }
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (data) => { 
    const response = await updateOrder(data);
    console.log(response.data.order)
    return response.data.order;
  }
);
export const updateRatingStatusAsync = createAsyncThunk(
  "order/rating-status",
  async (data) => { 
    const response = await updateRatingStatus(data);
    console.log(response)
    return response.data.order;
  }
);

export const fetchMonthelyOrderAsync = createAsyncThunk(
  "order/seller/fetchMonthelyOrder",
  async (id)=>{
    const response=await fetchMonthelyOrder(id)
    return response.data;
  }
)

export const resetSellerOrderAsync = createAsyncThunk(
  "order/seller/reset",
  async () => {
    return 'reset';
  }
)
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
    })
      .addCase(updateRatingStatusAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateRatingStatusAsync.fulfilled, (state,action) => {
        state.status = "idle";
      })
      .addCase(fetchMonthelyOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMonthelyOrderAsync.fulfilled, (state, action) => {
      state.status='idle'
        state.monthelyOrder = action.payload.orders;
        state.orderMonths = action.payload.months
      })
      .addCase(resetSellerOrderAsync.pending, (state) => {
      state.status="loading"
      })
      .addCase(resetSellerOrderAsync.fulfilled, (state, action) => {
        state.status = "idle",
          state.orders = []
          state.monthelyOrder = [],
          state.Currentorder = [],
          state.orderMonths = [];
          state.sellerOrder=[]
      })
      .addCase(orderByCardAsync.pending, (state) => {
      state.status="loading"
      })
      .addCase(orderByCardAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.Currentorder = action.payload;
    })
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrders = (state) => state.order.orders;
export const selectCurrentOrder = (state) => state.order.Currentorder;
export const selectSellerOrder = (state) => state.order.sellerOrder;
export const selectMonthelyOrder=(state) => state.order.monthelyOrder
export const selectOrderMonths=(state) => state.order.orderMonths
export default orderSlice.reducer;
