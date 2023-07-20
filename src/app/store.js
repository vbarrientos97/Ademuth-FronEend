import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
