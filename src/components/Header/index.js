import React, { useState, useContext } from "react";
import { LoginContext } from "context/LoginState";
import { Button, Nav, Container } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";

const Header = () => {
  const stateProvider = useContext(LoginContext);
  const [redirect, setRedirect] = useState(false);
  const afterLogout = () => {
    stateProvider.isUserLoggedIn = false;
    localStorage.removeItem("userlogined");
    setRedirect(!redirect);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-info justify-content-between">
      <Container>
        <div className="p-2 bg-gradient-dark text-white">
          {stateProvider.displayName} logged in
        </div>
      </Container>
      <Container></Container>
      <Link to="/dashboard">
        <Button variant="info">home</Button>
      </Link>
      <Link to="/dashboard/list">
        <Button variant="info">blogs</Button>
      </Link>
      <Button onClick={afterLogout} variant="danger">
        logout
      </Button>
      {/*Add bootstrap components*/}
      {redirect ? <Navigate to="/" replace /> : ""}
    </nav>
  );
};

export default Header;
