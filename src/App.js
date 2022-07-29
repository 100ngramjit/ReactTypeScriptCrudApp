import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LogIn from "./components/Login/LogIn";
// import DashBoard from "./components/DashBoard/DashBoardClass";
import Register from "./components/Register/Register";
import BlogList from "./components/BlogList/BlogList";
import { ProtectedRoute } from "./ProtectedRoute";
import Page404 from "./components/Page404/Page404";
import DashboardComp from "./components/DashBoard/DashBoard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/list" element={<BlogList />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<DashboardComp />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default App;
