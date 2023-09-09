import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productsReducer from "../features/productSlice";
import colorsReducer from "../features/colorSlice";
import designsReducer from "../features/localDesignSlice";
import orderReducer from "../features/orderSlice";
import priceReducer from "../features/priceSlice";
import purchaseReducer from "../features/purchaseSlice";
import tshirtReducer from "../features/tshirtSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    colors: colorsReducer,
    designs: designsReducer,
    orders: orderReducer,
    teeprice: priceReducer,
    purchases: purchaseReducer,
    tshirts: tshirtReducer,
  },
});
