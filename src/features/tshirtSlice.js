import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

// export const addTshirt = createAsyncThunk(
//   "tshirts/addTshirt",
//   async (tshirtData) => {
//     try {
//       console.log(tshirtData);
//       const response = await api.post("/tshirts", tshirtData);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       throw Error("Error al crear la personalización de camiseta.");
//     }
//   }
// );

export const addTshirt = createAsyncThunk(
  "tshirts/addTshirt",
  async (tshirtData) => {
    try {
      if (tshirtData.customDesign) {
        const formData = new FormData();
        formData.append("myFile", tshirtData.customDesign);

        const responseUpload = await api.post("/upload", formData);
        const imageUrl = responseUpload.data.imageUrl;

        const tshirtWithUrl = {
          id: tshirtData.id,
          localDesign: tshirtData.localDesign,
          color: tshirtData.color,
          size: tshirtData.size,
          customDesign: imageUrl || null,
          amount: tshirtData.amount,
          comments: tshirtData.comments,
          price: tshirtData.price,
        };

        const addResponse = await api.post("/tshirts", tshirtWithUrl);
        return addResponse.data;
      } else {
        const tshirt = {
          id: tshirtData.id,
          localDesign: tshirtData.localDesign,
          color: tshirtData.color,
          size: tshirtData.size,
          customDesign: null,
          amount: tshirtData.amount,
          comments: tshirtData.comments,
          price: tshirtData.price,
        };

        const addResponse = await api.post("/tshirts", tshirt);
        return addResponse.data;
      }
    } catch (error) {
      throw Error("Error al crear la camiseta.");
    }
  }
);

export const editTshirt = createAsyncThunk(
  "tshirts/editTshirt",
  async ({ id, tshirtData }) => {
    try {
      const response = await api.put(`/tshirts/${id}`, tshirtData);
      return response.data;
    } catch (error) {
      throw Error("Error al editar la personalización de camiseta.");
    }
  }
);

export const deleteTshirt = createAsyncThunk(
  "tshirts/deleteTshirt",
  async (id) => {
    try {
      await api.delete(`/tshirts/${id}`);
      return id;
    } catch (error) {
      throw Error("Error al eliminar la personalización de camiseta.");
    }
  }
);

export const fetchTshirts = createAsyncThunk(
  "tshirts/fetchTshirts",
  async () => {
    try {
      const response = await api.get("/tshirts");
      return response.data;
    } catch (error) {
      throw Error("Error al cargar las órdenes de compra.");
    }
  }
);

const tshirtSlice = createSlice({
  name: "tshirts",
  initialState: {
    tshirts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTshirts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTshirts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tshirts = action.payload;
      })
      .addCase(fetchTshirts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTshirt.fulfilled, (state, action) => {
        state.tshirts.push(action.payload.data);
      })
      .addCase(editTshirt.fulfilled, (state, action) => {
        const editedTshirt = action.payload;
        const existingTshirt = state.tshirts.find(
          (tshirt) => tshirt.id === editedTshirt.id
        );
        if (existingTshirt) {
          Object.assign(existingTshirt, editedTshirt);
        }
      })
      .addCase(deleteTshirt.fulfilled, (state, action) => {
        const id = action.payload;
        state.tshirts = state.tshirts.filter((tshirt) => tshirt.id !== id);
      });
  },
});

export default tshirtSlice.reducer;
