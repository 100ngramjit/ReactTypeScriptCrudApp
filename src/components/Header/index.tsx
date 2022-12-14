import React, { useContext } from "react";
import { LoginContext } from "context/LoginState";
import {
  LABEL_BLOGS,
  LABEL_HOME,
  LABEL_LOGGED_IN,
  LABEL_LOGOUT,
} from "constants/Constants";
import { URL_DASHBOARD, URL_LIST } from "constants/urlConstants";
import { Button, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const stateProvider = useContext(LoginContext);
  const afterLogout = () => {
    stateProvider.setIsUserLoggedIn(false);
    localStorage.removeItem("userlogined");
  };
  return (
    <Nav className="navbar navbar-expand-lg bg-dark justify-content-between">
      <Container>
        <Link to={URL_DASHBOARD}>
          <div className="p-2 bg-gradient-dark text-white">
            {stateProvider.displayName} {LABEL_LOGGED_IN}
          </div>
        </Link>
      </Container>
      <Link to={URL_DASHBOARD}>
        <Button variant="dark">{LABEL_HOME}</Button>
      </Link>
      <Link to={URL_LIST}>
        <Button variant="dark">{LABEL_BLOGS}</Button>
      </Link>
      <Button onClick={afterLogout} variant="danger" className="me-2">
        {LABEL_LOGOUT}
      </Button>
    </Nav>
  );
};

export default Header;
