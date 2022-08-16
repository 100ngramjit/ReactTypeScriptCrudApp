import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "pages/Login";
import Layout from "components/Layout";
import Signup from "pages/Signup";
import BlogList from "pages/BlogList";
import { ProtectedRoute } from "ProtectedRoute";
import Page404 from "pages/Page404";
import BlogDetails from "pages/BlogDetails";
import { LoginState } from "context/LoginState";
import List from "components/List";

const App = () => {
  return (
    <LoginState>
      <div style={{ backgroundColor: "lightblue", height: "100%" }}>
        <Routes>
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
            <Route path="list" element={<BlogList />} />
            <Route path=":id" element={<BlogDetails />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </LoginState>
  );
};

export default App;
