import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);

  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);

    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");

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
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    //получение статей
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
        state.data = null;
      })
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
        state.data = null;
      });
    //удаление продукта
    // builder.addCase(fetchRegister.pending, (state, action) => {
    //   console.log(action.meta.arg);
    //   state.product = state.product.filter(
    //     (obj) => obj._id !== action.meta.arg
    //   );
    // });
  },
  // extraReducers: {
  //   [fetchAuth.pending]: (state: { status: string; data: [] }) => {
  //     state.status = "loading";
  //     state.data = null;
  //   },
  //   [fetchAuth.fulfilled]: (state, action) => {
  //     state.data = action.payload;
  //     state.status = "loaded";
  //   },
  //   [fetchAuth.rejected]: (state) => {
  //     state.data = null;
  //     state.status = "error";
  //   },
  //   [fetchRegister.pending]: (state) => {
  //     state.status = "loading";
  //     state.data = null;
  //   },
  //   [fetchRegister.fulfilled]: (state, action) => {
  //     state.data = action.payload;
  //     state.status = "loaded";
  //   },
  //   [fetchRegister.rejected]: (state) => {
  //     state.data = null;
  //     state.status = "error";
  //   },
  //   [fetchAuthMe.pending]: (state) => {
  //     state.status = "loading";
  //     state.data = null;
  //   },
  //   [fetchAuthMe.fulfilled]: (state, action) => {
  //     state.data = action.payload;
  //     state.status = "loaded";
  //   },
  //   [fetchAuthMe.rejected]: (state) => {
  //     state.data = null;
  //     state.status = "error";
  //   },
  // },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
