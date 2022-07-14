import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/authSlice";
import { categorySlice } from "./slices/category/categorySlice";
import { productSlice } from "./slices/product/productSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
  },
});
