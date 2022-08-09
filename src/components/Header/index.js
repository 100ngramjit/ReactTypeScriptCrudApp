import React, { useState, useContext } from "react";
import { LoginContext } from "context/LoginState";
import { Navigate } from "react-router-dom";

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
      <div className="container">
        <div className="p-2 bg-gradient-dark text-white">
          {stateProvider.displayName} logged in
        </div>
        <button onClick={afterLogout} className="btn btn-danger">
          logout
        </button>
        {/*Add bootstrap components*/}
        {redirect ? <Navigate to="/" replace /> : ""}
      </div>
    </nav>
  );
};

export default Header;
