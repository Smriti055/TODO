import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";
import { motion } from "framer-motion";

function TaskList() {
  const todos = useSelector((state) => state.todo.todos);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return <p className="text-center text-red-500">Please log in to see tasks.</p>;
  }

  // Sort tasks by priority (High -> Medium -> Low)
  const sortedTodos = [...todos].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-neonGreen text-center">Your Tasks 📌</h2>
      <ul className="mt-4 space-y-4">
        {sortedTodos.map((todo) => (
          <motion.li
            key={todo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-2 bg-gray-900 p-4 rounded-lg shadow-lg w-full"
          >
            {/* Priority & Task Text */}
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <span
                  className={`w-6 h-6 flex items-center justify-center rounded-full text-lg font-bold ${todo.priority === "high"
                      ? "bg-red-500 text-white"
                      : todo.priority === "medium"
                        ? "bg-yellow-400 text-black"
                        : "bg-green-500 text-white"
                    }`}
                >
                  {todo.priority === "high" ? "🔥" : todo.priority === "medium" ? "⚡" : "✅"}
                </span>
                <span className="text-white text-lg">{todo.text || "Unnamed Task"}</span>
              </div>

              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => dispatch(removeTodo(todo.id))}
                className="bg-red-900 text-white px-4 py-2 rounded-lg"
              >
                ❌
              </motion.button>
            </div>

            {/* Show Weather for Outdoor Tasks */}
            {typeof todo.text === "string" && (todo.text.toLowerCase().includes("outdoor") ||
              todo.text.toLowerCase().includes("exercise") ||
              todo.text.toLowerCase().includes("walk")) || todo.text.toLowerCase().includes("play") && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-neonGreen text-sm"
                >
                  🌦️ Check the weather before heading out!
                </motion.p>
              )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
