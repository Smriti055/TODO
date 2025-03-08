import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/auth/authSlice";
import { motion } from "framer-motion";

function Login() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="relative flex flex-col items-center gap-6 mt-8 w-full">
      <div className="relative w-full">
  {/* Logout button container */}
  {isAuthenticated && (
    <div className="absolute top-4 right-4 sm:top-10 sm:right-10 z-10">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => dispatch(logout())}
        className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-md transition-all"
      >
        Logout 🚪
      </motion.button>
    </div>
  )} : (
        <>
          <div className="flex justify-center items-center font-bold text-2xl mt-2">
            <h1>Enter your name to login</h1>
          </div>

          <input
            type="text"
            placeholder="Enter username"
            className="bg-darkBg border border-neonGreen px-4 py-2 rounded-lg text-white outline-none focus:ring-2 focus:ring-neonGreen w-1/2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => username.trim() && dispatch(login({ username }))}
            className="bg-neonGreen text-black px-6 py-2 rounded-lg font-bold shadow-md transition-all w-1/2"
          >
            Login 🔐
          </motion.button>
        </>
      )}
    </div>
  );
}

export default Login;
