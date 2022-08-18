import React, { useState, useContext } from "react";
import { LoginContext } from "context/LoginState";
import { Home, Blogs, LoggedIn, Logout } from "components/Constants";
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
        <Link to="/dashboard">
          {" "}
          <div className="p-2 bg-gradient-dark text-white">
            {stateProvider.displayName} {LoggedIn}
          </div>
        </Link>
      </Container>
      <Container></Container>
      <Link to="/dashboard">
        <Button variant="dark">{Home}</Button>
      </Link>
      <Link to="/dashboard/list">
        <Button variant="dark">{Blogs}</Button>
      </Link>
      <Button onClick={afterLogout} variant="danger">
        {Logout}
      </Button>
      {/*Add bootstrap components*/}
      {!stateProvider.isUserLoggedIn ? <Navigate to="/" replace /> : ""}
    </nav>
  );
};

export default Header;
