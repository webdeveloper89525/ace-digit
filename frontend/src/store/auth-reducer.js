import { createSlice } from "@reduxjs/toolkit";

export const initAuth = {
  account: null,
};

const authSlice = createSlice({
  name: "auth", //the way it will look in the store
  initialState: initAuth,
  reducers: {
    login(state, action) {
      state.account = action.payload;
    },
    logout(state) {
      state.account = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
