import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice.js";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
