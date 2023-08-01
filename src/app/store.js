import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/productSlice";
import colorsReducer from "../features/colorSlice";
import designsReducer from "../features/localDesignSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    colors: colorsReducer,
    designs: designsReducer,
  },
});
