import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import TimeEntry from "./pages/TimeEntry/index.jsx";
import Project from "./pages/Project/index.jsx";
import User from "./pages/User/index.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/projects" element={<Project />} />
      <Route path="/time-entries" element={<TimeEntry />} />
      <Route path="/my-tracker" element={<User />} />
    </Routes>
  );
};

export default AppRoutes;
