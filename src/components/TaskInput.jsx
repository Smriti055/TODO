import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import { motion } from "framer-motion";

function TaskInput() {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();
  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(() => {
    if (location.trim()) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => setWeather(data))
        .catch((error) => console.error("Error fetching weather:", error));
    }
  }, [location]);

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo({ text: input, priority }));
      setInput("");
      setPriority("medium");
    }
  };

  return (
    <form
      onSubmit={addTodoHandler}
      className="flex flex-col items-center gap-4 mt-8 w-full max-w-2xl mx-auto"
    >

      {/* Task Input */}
      <input
        type="text"
        placeholder="📝 Enter a task..."
        className="bg-darkBg border border-neonGreen px-4 py-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-neonGreen w-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Weather Location Input (Unique Styling) */}
      <input
        type="text"
        placeholder="🌍 Enter your city for weather..."
        className="bg-gray-800 border-2 border-blue-400 px-4 py-3 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-500 w-full placeholder-blue-300 text-center"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* Priority Selector */}
      <div className="flex gap-4">
        <h1 className="text-2xl font-bold mt-1 text-gray-400">Add Priority: </h1>
        {[
          { level: "high", color: "bg-red-500", icon: "🔥" },
          { level: "medium", color: "bg-yellow-400", icon: "⚡" },
          { level: "low", color: "bg-green-500", icon: "✅" },
        ].map(({ level, color, icon }) => (
          <motion.button
            key={level}
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`px-4 py-2 rounded-lg font-bold shadow-md transition-all flex items-center gap-2 ${
              priority === level ? "border-2 border-neonGreen" : "border border-gray-500"
            } ${color}`}
            onClick={() => setPriority(level)}
          >
            {icon} {level.charAt(0).toUpperCase() + level.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Add Task Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        type="submit"
        className="bg-neonGreen text-black px-6 py-2 rounded-lg font-bold shadow-md transition-all w-full"
      >
        Add Task ➕
      </motion.button>

      {/* Weather Display */}
      {weather && weather.weather && weather.weather.length > 0 && (
        <div className="mt-4 text-blue-400 text-center bg-gray-900 px-4 py-2 rounded-lg">
          <p className="font-bold text-lg">🌤️ Weather in {weather.name}</p>
          <p>{weather.weather[0].description}</p>
          <p>🌡️ {weather.main.temp}°C</p>
        </div>
      )}
    </form>
  );
}

export default TaskInput;
