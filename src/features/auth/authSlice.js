import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false, // Default: User is logged out
  user: null, // Store user details (if needed)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; // Mock user data
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
