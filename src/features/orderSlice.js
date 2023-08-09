import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (orderData) => {
    try {
      console.log(orderData);
      const response = await api.post("/purchaseOrders", orderData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw Error("Error al crear la orden de compra.");
    }
  }
);

export const editOrder = createAsyncThunk(
  "orders/editOrder",
  async ({ id, orderData }) => {
    try {
      const response = await api.put(`/purchaseOrders/${id}`, orderData);
      return response.data;
    } catch (error) {
      throw Error("Error al editar la orden de compra.");
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id) => {
    try {
      await api.delete(`/purchaseOrders/${id}`);
      return id;
    } catch (error) {
      throw Error("Error al eliminar la orden de compra.");
    }
  }
);

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const response = await api.get("/purchaseOrders");
    return response.data;
  } catch (error) {
    throw Error("Error al cargar las órdenes de compra.");
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(editOrder.fulfilled, (state, action) => {
        const editedOrder = action.payload;
        const existingOrder = state.orders.find(
          (order) => order.id === editedOrder.id
        );
        if (existingOrder) {
          Object.assign(existingOrder, editedOrder);
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const id = action.payload;
        state.orders = state.orders.filter((order) => order.id !== id);
      });
  },
});

export default orderSlice.reducer;
