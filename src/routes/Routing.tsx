import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  URL_DASHBOARD,
  URL_LIST,
  URL_REGISTER,
  URL_ROOT,
} from "constants/urlConstants";
import Login from "pages/Login Register/Login";
import Layout from "components/Layout";
import Signup from "pages/Login Register/Signup";
import BlogList from "pages/BlogList";
import { ProtectedRoute } from "ProtectedRoute";
import Page404 from "pages/Page404";
import BlogDetails from "pages/BlogDetails";
import List from "components/List";

const Routing = () => {
  return (
    <Routes>
      <Route path={URL_ROOT} element={<Login />} />
      <Route path={URL_REGISTER} element={<Signup />} />
      <Route path={URL_DASHBOARD} element={<Layout />}>
        <Route index element={<List />} />
        <Route path="list" element={<BlogList />} />
        <Route path=":id" element={<BlogDetails />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Routing;
