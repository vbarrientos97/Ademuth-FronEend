import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const addColor = createAsyncThunk(
  "colors/addColor",
  async (colorData) => {
    try {
      const response = await api.post("/colors", colorData);
      return response.data;
    } catch (error) {
      throw Error("Error al crear el color.");
    }
  }
);

export const editColor = createAsyncThunk(
  "colors/editColor",
  async ({ id, colorData }) => {
    try {
      const response = await api.put(`/colors/${id}`, colorData);
      return response.data;
    } catch (error) {
      throw Error("Error al editar el color.");
    }
  }
);

export const deleteColor = createAsyncThunk(
  "colors/deleteColor",
  async (id) => {
    try {
      await api.delete(`/colors/${id}`);
      return id;
    } catch (error) {
      throw Error("Error al eliminar el color.");
    }
  }
);

export const fetchColors = createAsyncThunk(
  "colors/fetchColors",
  async () => {
    try {
      const response = await api.get("/colors");
      return response.data;
    } catch (error) {
      throw Error("Error al cargar los colores.");
    }
  }
);

const colorSlice = createSlice({
  name: "colors",
  initialState: {
    colors: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.colors = action.payload;
      })
      .addCase(fetchColors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        state.colors.push(action.payload);
      })
      .addCase(editColor.fulfilled, (state, action) => {
        const editedColor = action.payload;
        const existingColor = state.colors.find(
          (color) => color.id === editedColor.id
        );
        if (existingColor) {
          Object.assign(existingColor, editedColor);
        }
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        const id = action.payload;
        state.colors = state.colors.filter((color) => color.id !== id);
      });
  },
});

export default colorSlice.reducer;
