import React, { useState } from "react";
import { createContext } from "react";

const LoginContext = createContext();

const LoginState = ({ children }) => {
  let [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  var auth = JSON.parse(localStorage.getItem("auth"));
  let displayName = auth.username;
  return (
    <LoginContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        displayName,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export { LoginState, LoginContext };
