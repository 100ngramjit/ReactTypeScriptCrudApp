import React, { useState } from "react";
import { createContext } from "react";

const LoginContext = createContext();

const LoginState = ({ children }) => {
  let [loginScreen, setLoginScreen] = useState(true);
  let [signupScreen, setSignupScreen] = useState(false);
  let [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  let displayName = localStorage.getItem("userlogined");
  return (
    <LoginContext.Provider
      value={{
        loginScreen,
        setLoginScreen,
        signupScreen,
        setSignupScreen,
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
