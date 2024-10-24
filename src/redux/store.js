import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import auth from "./slices/auth";
const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth,
  },
});
export default store;
