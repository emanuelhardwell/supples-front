import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    categoryActive: null,
    modalOpen: false,
  },
  reducers: {
    categoryGet: (state, action) => {
      state.categories = action.payload;
    },
    categoryAdd: (state, action) => {
      state.categories.push(action.payload);
    },
    categoryDelete: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    categoryUpdate: (state, action) => {
      state.categories = state.categories.map((category) =>
        category.id === action.payload.id ? action.payload : category
      );
    },
    categoryModalOpen: (state) => {
      state.modalOpen = true;
    },
    categoryModalClose: (state) => {
      state.modalOpen = false;
    },
    categorySetActive: (state, action) => {
      state.categoryActive = action.payload;
    },
    categoryClearActive: (state) => {
      state.categoryActive = null;
    },
    categoryLogout: (state) => {
      state.categories = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  categoryGet,
  categoryAdd,
  categoryDelete,
  categoryUpdate,
  categoryModalClose,
  categoryModalOpen,
  categoryClearActive,
  categorySetActive,
  categoryLogout,
} = categorySlice.actions;
export default categorySlice.reducer;
