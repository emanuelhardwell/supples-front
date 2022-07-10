import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    // counter: 10,
    checking: true,
    // name: null,
    // uid: null,
  },
  reducers: {
    // increment: (state /* action */) => {
    //   state.counter += 1;
    // },
    authCheckingFinish: (state) => {
      state.checking = false;
    },
    authLogin: (state, action) => {
      state.checking = false;
      state.name = action.payload.name;
      state.uid = action.payload.uid;
    },
    authLogout: (state) => {
      state.checking = false;
      state.name = undefined;
      state.uid = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authCheckingFinish, authLogin, authLogout } = authSlice.actions;
export default authSlice.reducer;
