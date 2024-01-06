import { addListener, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, getCartByUserEmail, removeFromCart, resetCart, updateCart } from "./cartAPI";

const initialState = {
  value: 0,
  status: "idle",
  items: [],
  cartLoaded:false
};


export const addToCartAsync = createAsyncThunk(
  "cart/addtoCart",
  async (items) => { 
    const response = await addToCart(items);
    console.log("Response of Add to Cart",response)
    return response.data.products;
  }
);

export const getCartByEmailAsync = createAsyncThunk(
  "cart/getCartByEmail",
  async () => {
    const response = await getCartByUserEmail();
    console.log("Response of Cart",response)
    return response.data;
  }
)

export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async (id) => {
    const response =await removeFromCart(id);
    return response.data;
  }
)

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async () => {
    const response = await resetCart();
    return response.cart;
  }
)

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (items) => {
    const response = await updateCart(items);
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
        console.log("Payload",action.payload)
        // state.items.push(action.payload);
        state.cartLoaded = true;
      }
    )
    .addCase(getCartByEmailAsync.pending, (state) => {
      state.status = "loading";
    })
    .addCase(getCartByEmailAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.items = action.payload;
      state.cartLoaded=true

    }
    )
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.rejected, (state, action) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
        state.cartLoaded = false;
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(item => item.id === action.payload.id);
        state.items[index] = action.payload;
    })
    
  },
});

export const { increment } = cartSlice.actions;

export const selectcartItems = (state) => state.cart.items;
export default cartSlice.reducer;