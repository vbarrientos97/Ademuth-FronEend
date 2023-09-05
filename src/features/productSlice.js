import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData) => {
    try {
      const formData = new FormData();
      formData.append("myFile", productData.photoURL);

      const response = await api.post("/upload", formData);
      const imageUrl = response.data.imageUrl;

      const productWithUrl = {
        name: productData.name,
        description: productData.description,
        size: productData.size,
        price: productData.price,
        photoURL: imageUrl,
      };

      const addResponse = await api.post("/products", productWithUrl);
      console.log(addResponse);
      return addResponse.data;
    } catch (error) {
      throw Error("Error al crear el producto.");
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, productData }) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw Error("Error al editar el producto.");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (error) {
      throw Error("Error al eliminar el producto.");
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      throw Error("Error al cargar los productos.");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
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
        state.status = "succeeded";
        state.products.push(action.payload.data);
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const editedProduct = action.payload;
        const existingProduct = state.products.find(
          (product) => product.id === editedProduct.id
        );
        if (existingProduct) {
          Object.assign(existingProduct, editedProduct);
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload;
        state.products = state.products.filter((product) => product.id !== id);
      });
  },
});

export default productSlice.reducer;
