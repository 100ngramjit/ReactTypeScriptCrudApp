import React, { useState, useEffect, useContext } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { LoginContext } from "context/LoginState";
import List from "./List/List";
import { Container } from "react-bootstrap";

function MainScreen() {
  let a = useContext(LoginContext);
  // let [loginScreen, setLoginScreen] = useState(true);
  // let [signupScreen, setSignupScreen] = useState(false);
  // let [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  console.log("err", a);
  const afterSignup = (username) => {
    a.setSignupScreen(false);
    a.setLoginScreen(false);
    a.setIsUserLoggedIn(true);
  };

  const afterLogout = () => {
    localStorage.removeItem("userlogined");
    a.setSignupScreen(false);
    a.setLoginScreen(true);
    a.setIsUserLoggedIn(false);
  };

  useEffect(() => {
    let user = localStorage.getItem("userlogined");
    if (user !== null || user !== "") {
      a.setSignupScreen(false);
      a.setLoginScreen(true);
      a.setIsUserLoggedIn(false);
    }
  }, []);

  return (
    <>
      {a.loginScreen ? (
        <Container>
          <span>
            <Login afterLogin={afterSignup} />
            <button
              className="ml-20 p-10 btn btn-dark"
              onClick={() => {
                a.setSignupScreen(true);
                a.setLoginScreen(false);
              }}
            >
              register
            </button>
          </span>
        </Container>
      ) : (
        ""
      )}
      {a.signupScreen ? (
        <Container>
          <Signup afterSignup={afterSignup} />
          <button
            className="m-2 p-10 btn btn-dark"
            onClick={() => {
              a.setSignupScreen(false);
              a.setLoginScreen(true);
            }}
          >
            do login
          </button>
        </Container>
      ) : (
        ""
      )}

      {a.isUserLoggedIn ? <List /> : ""}
    </>
  );
}

export default MainScreen;
