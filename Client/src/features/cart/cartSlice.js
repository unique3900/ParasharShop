import { addListener, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, getCartByUserEmail, removeFromCart } from "./cartAPI";

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

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (id) => {
    const response = await removeFromCart(id);
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
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.status = "loading";
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items.splice(index, 1);
    })
    
  },
});

export const { increment } = cartSlice.actions;

export const selectcartItems = (state) => state.cart.items;
export const selectCartLengtg = (state) => state.cart.cartTotalNumber;


export default cartSlice.reducer;
