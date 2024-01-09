import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productListSlice";
import authReducer from '../features/Auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';
import userReducer from '../features/user/userSlice';
import addressReducer from '../features/Addresses/addressSlice';
import wishlistReducer from '../features/WishList/wishlistSlice';

import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    address: addressReducer,
    wishlist:wishlistReducer
  },
  middleware: [thunk]
});