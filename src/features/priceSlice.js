import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tshirtPrice: "",
};

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    setTshirtPrice: (state, action) => {
      state.tshirtPrice = action.payload;
    },
  },
});

export const { setTshirtPrice } = priceSlice.actions;
export default priceSlice.reducer;
