import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartQuantity: 0,
  },
  reducers: {
    cartGet: (state, action) => {
      state.cartItems = action.payload;
    },
    cartQuantityGet: (state, action) => {
      state.cartQuantity = action.payload;
    },
    cartQuantityAdd: (state, action) => {
      state.cartQuantity = state.cartQuantity + action.payload;
    },
    cartAdd: (state, action) => {
      state.cartItems.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { cartGet, cartQuantityGet, cartAdd, cartQuantityAdd } =
  cartSlice.actions;
export default cartSlice.reducer;
