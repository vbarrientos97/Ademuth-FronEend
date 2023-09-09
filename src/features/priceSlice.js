import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const editTeeprice = createAsyncThunk(
  "teeprice/editTeeprice",
  async ({ teepriceData }) => {
    try {
      const response = await api.put(`/teeprice/1`, teepriceData);
      return response.data;
    } catch (error) {
      throw Error("Error al editar el precio.");
    }
  }
);

export const fetchTeeprice = createAsyncThunk(
  "teeprice/fetchTeeprice",
  async () => {
    try {
      const response = await api.get("/teeprice");
      return response.data;
    } catch (error) {
      throw Error("Error al el precio.");
    }
  }
);

const priceSlice = createSlice({
  name: "teeprice",
  initialState: {
    teeprice: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeeprice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeeprice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teeprice = action.payload;
      })
      .addCase(fetchTeeprice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editTeeprice.fulfilled, (state, action) => {
        state.status = "succeeded";
        const editedTeeprice = action.payload;
        const existingTeeprice = state.teeprice.find(
          (teeprice) => teeprice.id === editedTeeprice.id
        );
        if (existingTeeprice) {
          Object.assign(existingTeeprice, editedTeeprice);
        }
      });
  },
});

export default priceSlice.reducer;
