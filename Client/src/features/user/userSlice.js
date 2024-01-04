import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserInfo, fetchLoggedInUserOrders, logoutUser, updateUserInfo} from "./userAPI";

const initialState = {
  userInfo: [],
  userOrders:[],
  status: 'idle',
};

export const fetchLoggedInUserInfoAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async ()=>{
    const response = await fetchLoggedInUserInfo();
    return response.data.user;
}
)

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async ()=>{
    const response = await fetchLoggedInUserOrders();
    console.log("Ordder Response",response.data.order)
    return response.data.order;
}
)

export const updateuserInfoAsync=createAsyncThunk(
  "user/updateUserInfo",
  async (update) => {
    const response = await updateUserInfo(update);
    return response.data;
  }
)

export const logoutUserAsync = createAsyncThunk(
  "user/logout",
  async () => {
    document.cookie = `${'jwt'}= ''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    const response = await logoutUser();
    return response.data;
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserInfoAsync.rejected, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserOrdersAsync.rejected, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;

      })
      .addCase(updateuserInfoAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateuserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(logoutUserAsync.pending, (state) => {
      state.status="loading"
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
          state.status = "idle",
          state.userInfo = action.payload;
    })
    
  },
});

export const {  } = userSlice.actions;

export const selectLoggedInUserInfo = (state) => state.user.userInfo;
export const selectLoggedInUserOrders = (state) => state.user.userOrders;
export default userSlice.reducer;
