import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "pages/Login Register/Login";
import Layout from "components/Layout";
import Signup from "pages/Login Register/Signup";
import BlogList from "pages/BlogList";
import { ProtectedRoute } from "ProtectedRoute";
import Page404 from "pages/Page404";
import BlogDetails from "pages/BlogDetails";
import { LoginState } from "context/LoginState";
import List from "components/List";
import Routing from "routes/Routing";

const App = () => {
  return (
    <LoginState>
      <div style={{ backgroundColor: "grey" }}>
        <Routing />
      </div>
    </LoginState>
  );
};

export default App;
