import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, updateUser } from "./authApi";

const initialState = {
  loggedInUser: null,
  users:[],
  status: "idle",
};


export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (email,password,address,fullName,phone,gender,addresses) => {
    const response = await createUser(email,password,address,fullName,phone,gender,addresses);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (updates) => {
    const response = await updateUser(updates);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (email,password) => {
    const response = await loginUser(email,password);
    return response.data;
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
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
        state.loggedInUser = action.payload;
      });
    
  },
});

export const {  } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectUsers = (state) => state.auth.users;

export default authSlice.reducer;
