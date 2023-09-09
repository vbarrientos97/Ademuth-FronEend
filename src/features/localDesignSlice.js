import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const addDesign = createAsyncThunk(
  "designs/addDesign",
  async (designData) => {
    try {
      const formData = new FormData();
      formData.append("myFile", designData.image);

      const response = await api.post("/upload", formData);
      const imageUrl = response.data.imageUrl;

      const designWithUrl = {
        name: designData.name,
        image: imageUrl,
      };

      const addResponse = await api.post("/localDesigns", designWithUrl);
      console.log(addResponse);
      return addResponse.data;
    } catch (error) {
      throw Error("Error al crear el diseño.");
    }
  }
);

export const editDesign = createAsyncThunk(
  "designs/editDesign",
  async ({ id, designData }) => {
    try {
      // Verificar si se proporcionó una nueva imagen
      if (designData.image) {
        // Crear un nuevo objeto FormData y agregar la nueva imagen
        const formData = new FormData();
        formData.append("myFile", designData.image);

        // Enviar la nueva imagen al servidor y obtener la URL de la imagen actualizada
        const imageResponse = await api.post("/upload", formData);
        const newImageUrl = imageResponse.data.imageUrl;

        // Actualizar designData con la nueva URL de la imagen
        designData.image = newImageUrl;
      }

      // Realizar la solicitud PUT al servidor con los datos actualizados
      const response = await api.put(`/localDesigns/${id}`, designData);

      return response.data;
    } catch (error) {
      throw Error("Error al editar el diseño.");
    }
  }
);

export const deleteDesign = createAsyncThunk(
  "designs/deleteDesign",
  async (id) => {
    try {
      await api.delete(`/localDesigns/${id}`);
      return id;
    } catch (error) {
      throw Error("Error al eliminar el diseño.");
    }
  }
);

export const fetchDesigns = createAsyncThunk(
  "designs/fetchDesigns",
  async () => {
    try {
      const response = await api.get("/localDesigns");
      return response.data;
    } catch (error) {
      throw Error("Error al cargar los diseños.");
    }
  }
);

const designSlice = createSlice({
  name: "designs",
  initialState: {
    designs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesigns.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDesigns.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designs = action.payload;
      })
      .addCase(fetchDesigns.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addDesign.fulfilled, (state, action) => {
        state.designs.push(action.payload.data);
      })
      .addCase(editDesign.fulfilled, (state, action) => {
        const editedDesign = action.payload;
        const existingDesign = state.designs.find(
          (design) => design.id === editedDesign.id
        );
        if (existingDesign) {
          Object.assign(existingDesign, editedDesign);
        }
      })
      .addCase(deleteDesign.fulfilled, (state, action) => {
        const id = action.payload;
        state.designs = state.designs.filter((design) => design.id !== id);
      });
  },
});

export default designSlice.reducer;
