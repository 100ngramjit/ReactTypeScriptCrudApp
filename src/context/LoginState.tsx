import React, { useState } from "react";
import { createContext } from "react";

const LoginContext = createContext({
  displayName: "",
  setIsUserLoggedIn: null,
  isUserLoggedIn: false,
});

const LoginState = ({ children }) => {
  const displayName = localStorage.getItem("userlogined");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    displayName ? true : false
  );
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
