import React, { useState } from "react";
import { createContext } from "react";

type LoginContextType = {
  displayName: string;
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginContextState = {
  displayName: "",
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {},
};

const LoginContext = createContext<LoginContextType>(LoginContextState);

const LoginState = ({ children }: any) => {
  const displayName = localStorage.getItem("userlogined")!;
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
