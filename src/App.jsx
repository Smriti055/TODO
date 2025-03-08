import React from "react";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="container mx-auto mt-5 text-center">
      <h1 className="text-2xl font-bold mb-2">Welcome to <span className="text-purple-500">TODO APP 📝</span></h1>
      <Login /> {/* Authentication Section */}
      {isAuthenticated && (
        <>
          <TaskInput />
          <TaskList />
        </>
      )}
    </div>
  );
}

export default App;
