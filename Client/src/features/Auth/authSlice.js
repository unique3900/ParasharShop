import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser, updateUser, userLogout } from "./authApi";

const initialState = {
  loggedInUser: null,
  status: "idle",
};


export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (data) => {
    const response = await createUser(data);
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
  "auth/loginUser",
  async (data) => {
    const response = await loginUser(data);
    return response.data;
  }
)
export const logoutUserAsync = createAsyncThunk(
  "auth/logoutUser",
  async (data) => {
    const response = await userLogout(data);
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
        // state.loggedInUser = action.payload;
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
      .addCase(logoutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
    
  },
});

export const {  } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;



export default authSlice.reducer;
