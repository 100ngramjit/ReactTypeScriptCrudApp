import React from "react";
import { Route, Navigate } from "react-router-dom";
import { get } from "lodash";

function requireAuth(userNameKey) {
  return JSON.parse(localStorage.getItem(userNameKey)).isUserLoggedIn;
}

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (
            get(props.location, "state.userName") &&
            requireAuth(props.location.state.userName)
          ) {
            return <Component {...props} />;
          } else {
            return (
              <Navigate
                to={{
                  pathname: "/",
                }}
              />
            );
          }
        }}
      />
    </>
  );
};
