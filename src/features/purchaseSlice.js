import { createSlice } from "@reduxjs/toolkit";

const purchaseSlice = createSlice({
  name: "purchases",
  initialState: {
    selectedProducts: [],
  },
  reducers: {
    addToPurchase: (state, action) => {
      state.selectedProducts.push(action.payload);
    },
    removeFromPurchase: (state, action) => {
      const productIdToRemove = action.payload;
      state.selectedProducts = state.selectedProducts.filter(
        (product) => product.id !== productIdToRemove
      );
    },
    clearSelectedProducts: (state) => {
      state.selectedProducts = [];
    },
  },
});

export const { addToPurchase, removeFromPurchase, clearSelectedProducts } =
  purchaseSlice.actions;

export default purchaseSlice.reducer;
