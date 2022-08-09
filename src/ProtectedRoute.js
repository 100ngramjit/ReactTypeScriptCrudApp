import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { LoginContext } from "context/LoginState";

export const ProtectedRoute = ({ children }) => {
  const stateProvider = useContext(LoginContext);

  function requireAuth() {
    return stateProvider.isUserLoggedIn;
  }
  if (requireAuth()) {
    return children;
  } else {
    return (
      <Navigate
        to={{
          pathname: "/",
        }}
      />
    );
  }
};
