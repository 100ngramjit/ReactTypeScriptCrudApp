import React, { useContext } from "react";
import { LoginContext } from "context/LoginState";
import Header from "components/Header";
import { URL_ROOT } from "constants/urlConstants";
import { Navigate, Outlet } from "react-router-dom";

const Layout = () => {
  const stateProvider = useContext(LoginContext);
  return (
    <>
      {!stateProvider.isUserLoggedIn && <Navigate to={URL_ROOT} replace />}
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
