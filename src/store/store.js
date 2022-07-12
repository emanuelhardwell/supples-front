import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/authSlice";
import { categorySlice } from "./slices/category/categorySlice";

export const store = configureStore({
  reducer: { auth: authSlice.reducer, category: categorySlice.reducer },
});
