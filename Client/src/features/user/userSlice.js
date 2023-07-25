import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserInfo, fetchLoggedInUserOrders, updateUserInfo} from "./userAPI";

const initialState = {
  userInfo: [],
  userOrders:[],
  status: 'idle',
  
};

export const fetchLoggedInUserInfoAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (userId)=>{
    const response = await fetchLoggedInUserInfo(userId);
    return response.data;
}
)

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (userId)=>{
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
}
)

export const updateuserInfoAsync=createAsyncThunk(
  "user/updateUserInfo",
  async (update) => {
    const response = await updateUserInfo(update);
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
      .addCase(updateuserInfoAsync.rejected, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateuserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
    
  },
});

export const {  } = userSlice.actions;

export const selectLoggedInUserInfo = (state) => state.user.userInfo;
export const selectLoggedInUserOrders = (state) => state.user.userOrders;
export default userSlice.reducer;
