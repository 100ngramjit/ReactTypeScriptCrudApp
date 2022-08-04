import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React, { useContext } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import LogIn from "pages/Login/LogIn";
import Layout from "components/Layout/Layout";
// import DashBoard from "./components/DashBoard/DashBoardClass";
import Register from "pages/Register/Register";
import BlogList from "pages/BlogList/BlogList";
import { ProtectedRoute } from "ProtectedRoute";
import Page404 from "pages/Page404/Page404";
import DashboardComp from "pages/DashBoard/DashBoard";
import { DataContext } from "context/DataContext";
import BlogDetails from "pages/BlogDetails.js/BlogDetails";
import List from "components/List/List";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LogIn />} />

        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<DashboardComp />} />
          <Route path=":id" element={<BlogDetails />} />
          <Route path="list" element={<List />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default App;
