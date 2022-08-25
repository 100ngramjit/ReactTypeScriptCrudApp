import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducer";

export default configureStore({
  reducer: blogReducer,
});
