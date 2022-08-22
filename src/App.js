import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import React from "react";
import "./app.scss";
import { LoginState } from "context/LoginState";
import Routing from "routes/Routing";

const App = () => {
  return (
    <LoginState>
      <Routing />
    </LoginState>
  );
};

export default App;
