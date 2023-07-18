import { addListener, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, getCartByUserEmail } from "./cartAPI";

const initialState = {
  value: 0,
  status: "idle",
  items: [],
  cartTotalNumber:0,
  cartLoaded:false
};


export const addToCartAsync = createAsyncThunk(
  "cart/addtoCart",
  async (items) => { 
    const response = await addToCart(items);
    return response.data;
  }
);

export const getCartByEmailAsync = createAsyncThunk(
  "cart/getCartByEmail",
  async (email) => {
    const response = await getCartByUserEmail(email);
    return response.data;
  }
)

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
        state.items.push(action.payload);
        state.cartTotalNumber = state.items.length;
      }
    )
    .addCase(getCartByEmailAsync.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getCartByEmailAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.items = action.payload;
      state.cartTotalNumber = state.items.length;
    }
  )
    
  },
});

export const { increment } = cartSlice.actions;

export const selectcartItems = (state) => state.cart.items;
export const selectCartLengtg = (state) => state.cart.cartTotalNumber;


export default cartSlice.reducer;
