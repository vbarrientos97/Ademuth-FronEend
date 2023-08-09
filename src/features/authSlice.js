import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const response = await api.post("/persons/register", userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    const response = await api.post("/persons/login", userData);
    return response.data;
  }
);

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
