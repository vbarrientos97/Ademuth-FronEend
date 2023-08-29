import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/authSlice";
import productsReducer from "../features/productSlice";
import colorsReducer from "../features/colorSlice";
import designsReducer from "../features/localDesignSlice";
import orderReducer from "../features/orderSlice";
import priceReducer from "../features/priceSlice";
import purchaseReducer from "../features/purchaseSlice";
import tshirtReducer from "../features/tshirtSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedPriceReducer = persistReducer(persistConfig, priceReducer);
const persistedPurchaseReducer = persistReducer(persistConfig, purchaseReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    colors: colorsReducer,
    designs: designsReducer,
    orders: orderReducer,
    price: persistedPriceReducer,
    purchases: persistedPurchaseReducer,
    tshirts: tshirtReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
