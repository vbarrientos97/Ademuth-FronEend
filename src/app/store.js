import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productsReducer from "../features/productSlice";
import colorsReducer from "../features/colorSlice";
import designsReducer from "../features/localDesignSlice";
import orderSlice from "../features/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    colors: colorsReducer,
    designs: designsReducer,
    orders: orderSlice,
  },
});
