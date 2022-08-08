import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React, { useContext } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";
import Layout from "components/Layout";
// import DashBoard from "./components/DashBoard/DashBoardClass";
import Signup from "pages/Signup";
import BlogList from "pages/BlogList";
import { ProtectedRoute } from "ProtectedRoute";
import Page404 from "pages/Page404";
import DashboardComp from "pages/DashBoard";
import { DataContext } from "context/DataContext";
import BlogDetails from "pages/BlogDetails";
import { LoginState } from "context/LoginState";
import List from "components/List";

const App = () => {
  return (
    <LoginState>
      <div>
        <Routes>
          {/* <Route path="/" element={<LogIn />} /> */}

          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<List />} />
            <Route path=":id" element={<BlogDetails />} />
            <Route path="list" element={<List />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </LoginState>
  );
};

export default App;
