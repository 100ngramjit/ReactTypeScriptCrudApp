import React, { useState } from "react";
import { createContext } from "react";

const LoginContext = createContext();

const LoginState = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const displayName = localStorage.getItem("userlogined");
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
