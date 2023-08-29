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
  },
});

export const { addToPurchase, removeFromPurchase } = purchaseSlice.actions;

export default purchaseSlice.reducer;
