import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";


export const fetchWeatherData = createAsyncThunk(
  "todo/fetchWeatherData",
  async (location, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?q=${location}&appid=${API_KEY}&units=metric`);
      return response.data; 
    } catch (error) {
      console.error("Weather API Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to fetch weather data.");
    }
  }
);

const initialState = {
  todos: [],
  weather: null,
  error: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { text, priority } = action.payload;
      state.todos.push({
        id: nanoid(),
        text: typeof text === "string" ? text : String(text),
        priority: priority || "low",
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.error = null; // Clear previous errors
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.weather = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
