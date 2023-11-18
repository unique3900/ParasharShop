import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassword, createUser, loginUser, sellerLogin, updateUser, userLogout } from "./authApi";

const initialState = {
  loggedInUser: null,
  loggedInSeller:null,
  status: "idle",
};


export const createUserAsync = createAsyncThunk(
  "auth/register",
  async (data) => {
    const response = await createUser(data);
    console.log(response)
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/login",
  async (data) => {
    const response = await loginUser(data);
    return response.data.user;
  }
)

export const loginSellerAsync = createAsyncThunk(
  "auth/loginSeller",
  async (data) => {
    const response = await sellerLogin(data);
    return response.data.user;
  })
export const logoutUserAsync = createAsyncThunk(
  "auth/logoutUser",
  async (data) => {
    const response = await userLogout(data);
    return response.data;
  }
)
export const changePasswordAsync = createAsyncThunk(
  "auth/change-password",
  async (data) => {
    const response = await changePassword(data);
    return response.data.user;
  }
)

export const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("Payload Received",action.payload)
        state.loggedInUser= action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(loginSellerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginSellerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInSeller = action.payload;
      })
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
        state.loggedInSeller = null;
      });
    
  },
});

export const {  } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectLoggedInSeller = (state) => state.auth.loggedInSeller;


export default authSlice.reducer;
