import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToWishlist, deleteWishlist, fetchUserWishlist, resetWishlist } from "./wishlistApi";

const initialState = {
  wishlist: [],
  status: "idle",
};

export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addToWishlist",
  async (product) => {
      const response = await addToWishlist(product);
      console.log(response.data.wishlist)
    return response.data.wishlist;
  }
);
export const fetchUserWishlistAsync = createAsyncThunk(
  "wishlist/fetchUserWishlist",
  async () => {
    const response = await fetchUserWishlist();
    return response.data.wishlist;
  }
);

export const deleteWishlistAsync = createAsyncThunk(
    'wishlist/deleteWishlist',
    async (id) => {
      const response = await deleteWishlist(id);
      console.log(response.data.wishlist)
       return response.data.wishlist;
    }
)
export const resetWishListAsync = createAsyncThunk(
    'wishlist/resetWishlist',
    async () => {
        const response = await resetWishlist();
        return response.wishlist;
    }
)

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserWishlistAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserWishlistAsync.fulfilled, (state, action) => {
        (state.status = "idle"), (state.wishlist = action.payload);
      })
        .addCase(addToWishlistAsync.pending, (state) => {
            state.status = "loading";
        })
        .addCase(addToWishlistAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.wishlist = action.payload;
        })
        .addCase(deleteWishlistAsync.pending, (state) => {
            state.status = 'loading';  
      })
        .addCase(deleteWishlistAsync.fulfilled, (state,action) => {
            state.status = 'idle',
            state.wishlist = action.payload;
        })
        .addCase(resetWishListAsync.pending, (state) => {
          state.status='loading'
        })
        .addCase(resetWishListAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.wishlist = [];
      })
  },
});

export const {} = wishlistSlice.actions;

export const selectUserWishList = (state) => state.wishlist.wishlist;

export default wishlistSlice.reducer;
