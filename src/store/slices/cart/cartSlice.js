import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartNumber: 0,
  },
  reducers: {
    cartGet: (state, action) => {
      state.cartItems = action.payload;
    },
    cartNumber: (state, action) => {
      state.cartNumber = action.payload;
    },
    cartNumberAdd: (state, action) => {
      state.cartNumber = state.cartNumber + action.payload;
    },
    cartAdd: (state, action) => {
      state.cartItems.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { cartGet, cartNumber, cartAdd, cartNumberAdd } =
  cartSlice.actions;
export default cartSlice.reducer;
