import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/products");
      return response.data;
    } catch (error) {
      throw Error("Error al obtener los productos.");
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/products",
        product
      );
      return response.data;
    } catch (error) {
      throw Error("Error al agregar el producto.");
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (product) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/products/${product.id}`,
        product
      );
      return response.data;
    } catch (error) {
      throw Error("Error al editar el producto.");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${productId}`);
      return productId;
    } catch (error) {
      throw Error("Error al eliminar el producto.");
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const { id, name, description, price } = action.payload;
        const foundProduct = state.products.find(
          (product) => product.id === id
        );
        if (foundProduct) {
          foundProduct.name = name;
          foundProduct.description = description;
          foundProduct.price = price;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const productId = action.payload;
        const index = state.products.findIndex(
          (product) => product.id === productId
        );
        if (index !== -1) {
          state.products.splice(index, 1);
        }
      });
  },
});

export default productSlice.reducer;
