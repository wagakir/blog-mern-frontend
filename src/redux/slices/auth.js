import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);

  return data;
});

// export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
//   const { data } = await axios.get("/tags");

//   return data;
// });

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    // [fetchTags.pending]: (state) => {
    //   state.tags.status = "loading";
    // },
    // [fetchTags.fulfilled]: (state, action) => {
    //   state.tags.items = action.payload;
    //   state.tags.status = "loaded";
    // },
    // [fetchTags.rejected]: (state) => {
    //   state.tags.items = [];
    //   state.tags.status = "error";
    // },
  },
});
export const authReducer = authSlice.reducer;
