import React, { useState, useContext } from "react";
import { LoginContext } from "context/LoginState";
import {
  LABEL_BLOGS,
  LABEL_HOME,
  LABEL_LOGGED_IN,
  LABEL_LOGOUT,
} from "constants/Constants";
import { Button, Nav, Container } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";

const Header = () => {
  const stateProvider = useContext(LoginContext);
  const afterLogout = () => {
    stateProvider.setIsUserLoggedIn(false);
    localStorage.removeItem("userlogined");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark justify-content-between">
      <Container>
        {!stateProvider.isUserLoggedIn ? <Navigate to="/" replace /> : ""}
        <Link to="/dashboard">
          <div className="p-2 bg-gradient-dark text-white">
            {stateProvider.displayName} {LABEL_LOGGED_IN}
          </div>
        </Link>
      </Container>
      <Link to="/dashboard">
        <Button variant="dark">{LABEL_HOME}</Button>
      </Link>
      <Link to="/dashboard/list">
        <Button variant="dark">{LABEL_BLOGS}</Button>
      </Link>
      <Button onClick={afterLogout} variant="danger">
        {LABEL_LOGOUT}
      </Button>
    </nav>
  );
};

export default Header;
