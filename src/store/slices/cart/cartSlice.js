import { createSlice, current } from "@reduxjs/toolkit";

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
    cartSubtract: (state, action) => {
      let { cartItems } = current(state);
      let quantity = cartItems.filter(
        (item) => item.CartItem.id === action.payload
      );

      let res = quantity[0].CartItem.quantity || 0;

      state.cartQuantity = state.cartQuantity - res;
    },
    cartDelete: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.CartItem.id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  cartGet,
  cartQuantityGet,
  cartAdd,
  cartSubtract,
  cartQuantityAdd,
  cartDelete,
} = cartSlice.actions;
export default cartSlice.reducer;
