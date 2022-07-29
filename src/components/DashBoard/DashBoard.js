import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { get } from "lodash";
import Header from "../Header.js/Header";
import List from "../../List/List";

const DashboardComp = () => {
  return (
    <div>
      <Header />

      <div className="container">
        <h1 className="mt-4">Hello</h1>
        <p>Welcome to the dashboard</p>
        <List />
      </div>
    </div>
  );
};

export default DashboardComp;
