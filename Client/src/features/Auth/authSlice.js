import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassword, changeSellerPassword, checkIfUser, checkUser, createUser, fetchSellerInfo, handleRemoveToken, loginUser, sellerLogin, sellerRegister, updateUser } from "./authApi";

const initialState = {
  loggedInUserToken: null,
  loggedInSeller:null,
  status: "idle",
};


const resetAuth = () => initialState;

export const checkIfUserAsync = createAsyncThunk(
  'auth/check-if-user',
  async () => {
    const response =  checkIfUser();
    return response.token;
  }
)

export const createUserAsync = createAsyncThunk(
  "auth/register",
  async (data) => {
    const response = await createUser(data);
    console.log(response)
    return response.data;
  }
);
export const removeTokenAsync = createAsyncThunk(
  "auth/removeToken",
  async () => {
    document.cookie = `${'jwt'}= ''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    resetAuth();
    const response = await handleRemoveToken();
    return response.token;
  }
)
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
export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (data) => {
    const response = await checkUser();
    return response.data.user;
  }
)
export const registerSellerAsync = createAsyncThunk(
  "auth/registerSeller",
  async (data) => {
    const response = await sellerRegister(data);
    return response.data.seller;
  }
)
export const loginSellerAsync = createAsyncThunk(
  "auth/loginSeller",
  async (data) => {
    const response = await sellerLogin(data);
    console.log("Seller Resp",response)
    return response.data.seller;
  })

export const fetchLoggedInSellerAsync = createAsyncThunk(
  "auth/fetchLoggedInSeller",
  async(id)=> {
    const response = await fetchSellerInfo();
    return response.data.seller;
  }
  
)

export const changePasswordAsync = createAsyncThunk(
  "auth/change-password",
  async (data) => {
    const response = await changePassword(data);
    return response.data.user;
  }
)

export const changeSellerPasswordAsync = createAsyncThunk(
  "seller/change-password",
  async (data) => {
    const response = await changeSellerPassword(data);
    return response.data.seller;
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
      .addCase(checkIfUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkIfUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
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
        state.loggedInUserToken= action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginSellerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginSellerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInSeller = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(fetchLoggedInSellerAsync.pending, (state) => {
        state.status="loading"
      })
      .addCase(fetchLoggedInSellerAsync.fulfilled, (state, action) => {
        state.status = "idle",
        state.loggedInSeller=action.payload
      })
      .addCase(changePasswordAsync.pending, (state) => {
        state.status="loading"
      })
      .addCase(changePasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(changeSellerPasswordAsync.pending, (state) => {
        state.status="loading"
      })
      .addCase(changeSellerPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(removeTokenAsync.pending, (state) => {
        state.status = "loading"
        
    })
      .addCase(removeTokenAsync.fulfilled, (state, action) => {
        state.status = "idle",
          state.loggedInUserToken = action.payload;
        state.loggedInSeller = null;
    })
    
  },
});

export const {  } = authSlice.actions;

export const selectLoggedInUserToken = (state) => state.auth.loggedInUserToken;
export const selectLoggedInSeller = (state) => state.auth.loggedInSeller;


export default authSlice.reducer;
