import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productActive: null,
    productCategories: [],
    modalOpen: false,
  },
  reducers: {
    productGet: (state, action) => {
      state.products = action.payload;
    },
    productAdd: (state, action) => {
      state.products.push(action.payload);
    },
    productDelete: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    productUpdate: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    },
    productModalOpen: (state) => {
      state.modalOpen = true;
    },
    productModalClose: (state) => {
      state.modalOpen = false;
    },
    productSetActive: (state, action) => {
      state.productActive = action.payload;
    },
    productClearActive: (state) => {
      state.productActive = null;
    },
    productGetCategories: (state, action) => {
      state.productCategories = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  productGet,
  productAdd,
  productDelete,
  productUpdate,
  productModalClose,
  productModalOpen,
  productClearActive,
  productSetActive,
  productGetCategories,
} = productSlice.actions;
export default productSlice.reducer;
