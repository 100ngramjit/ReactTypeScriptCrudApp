import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { LoginContext } from "context/LoginState";
import { toast } from "react-hot-toast";
import { Navigate, Link } from "react-router-dom";

function Login(props) {
  const stateProvider = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passType, setPassType] = useState(true);

  const auth = JSON.parse(localStorage.getItem("auth"));

  const handleLogin = () => {
    if (auth === null) {
      toast.error("no user found!");
    }

    const same = auth.filter((d) => d.username === username);

    if (same.length !== 0) {
      if (same[0].password === password) {
        localStorage.setItem("userlogined", username);
        setUsername("");
        setPassword("");
        stateProvider.isUserLoggedIn = true;
      } else {
        toast.error("wrong password.");
      }
    } else {
      toast.error(username + "user not exist!");
    }
  };
  useEffect(() => {
    let user = localStorage.getItem("userlogined");
    if (user !== null || user !== "") {
      stateProvider.setIsUserLoggedIn(false);
    }
  }, []);

  return (
    <Container>
      {stateProvider.isUserLoggedIn ? <Navigate to="/dashboard" replace /> : ""}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2>Hello,Please enter your credentials</h2>
        <Form.Group controlId="username">
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="m-2 p-10"
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control
            type={passType ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="m-2 p-10"
            required
          />
        </Form.Group>
        <Button
          variant="secondary"
          type="button"
          onClick={() => {
            setPassType(!passType);
          }}
        >
          {passType ? "show" : "hide"}
        </Button>
        {"  "}
        <Button type="submit">login</Button>
        {"  "}
        <Link to="/register">
          <Button variant="info">register</Button>
        </Link>
      </Form>
    </Container>
  );
}

export default Login;
