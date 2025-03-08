import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import authReducer from "../features/auth/authSlice"; 

const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer, 
  },
});

export default store;
