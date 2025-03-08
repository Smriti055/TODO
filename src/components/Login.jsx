import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/auth/authSlice";
import { motion } from "framer-motion";

function Login() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="relative w-full flex flex-col items-center gap-6 mt-8">
      {/* Logout Button (Only visible when logged in) */}
      {isAuthenticated && (
        <div className="absolute top-4 right-4 sm:top-0 sm:right-0 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => dispatch(logout())}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-md transition-all"
          >
            Logout 🚪
          </motion.button>
        </div>
      )}

      {!isAuthenticated ? (
        <>
          {/* Login Title */}
          <div className="flex justify-center items-center font-bold text-2xl mt-2">
            <h1>Enter your name to login</h1>
          </div>

          {/* Username Input */}
          <input
            type="text"
            placeholder="Enter username"
            className="bg-darkBg border border-neonGreen px-4 py-2 rounded-lg text-white outline-none focus:ring-2 focus:ring-neonGreen w-4/5 sm:w-1/2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => username.trim() && dispatch(login({ username }))}
            className="bg-neonGreen text-black px-6 py-2 rounded-lg font-bold shadow-md transition-all w-4/5 sm:w-1/2"
          >
            Login 🔐
          </motion.button>
        </>
      ) : (
        <h1 className="text-xl font-bold text-gray-400">Welcome, {username}!</h1>
      )}
    </div>
  );
}

export default Login;
