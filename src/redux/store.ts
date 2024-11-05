import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import auth from "./slices/auth";
import { useDispatch } from "react-redux";
const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth,
  },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;
