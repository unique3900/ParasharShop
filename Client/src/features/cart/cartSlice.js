import { addListener, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart } from "./cartAPI";

const initialState = {
  value: 0,
  status: "idle",
  items: [],
  cartLoaded:false
};


export const addToCartAsync = createAsyncThunk(
  "cart/addtoCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      });
  },
});

export const { increment } = cartSlice.actions;

export const cartItems = (state) => state.cart.items;


export default cartSlice.reducer;
