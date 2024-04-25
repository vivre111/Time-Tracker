import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks/index.jsx";
import Projects from "./pages/Projects/index.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/projects" element={<Projects/>} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
};

export default AppRoutes;
