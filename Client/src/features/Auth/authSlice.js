import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "./authApi";

const initialState = {
  loggedInUser: null,
  status: "idle",
};


export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (email,password,address,fullName,phone,gender) => {
    const response = await createUser(email,password,address,fullName,phone,gender);
    return response.data;
  }
);

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
        state.loggedInUser = action.payload;
      });
  },
});

export const {  } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;


export default authSlice.reducer;
