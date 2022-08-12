import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  InputGroup,
} from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
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

  return (
    <Container>
      {stateProvider.isUserLoggedIn ? <Navigate to="/dashboard" replace /> : ""}{" "}
      <Row>
        <Col />
        <Col>
          <Card
            style={{
              margin: "1rem",
              padding: "0.1rem",
            }}
            text="light"
            bg="dark"
          >
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <h3>Login</h3>
                <hr />
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="m-1"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password1">
                  <Form.Label>Password</Form.Label>
                  <InputGroup className="m-2">
                    <Form.Control
                      type={passType ? "password" : "text"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Add password"
                      required
                    />
                    <InputGroup.Text
                      onClick={() => {
                        setPassType(!passType);
                      }}
                    >
                      {passType ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                {"  "}
                <Button type="submit">login</Button>
                {"  "}
                <Link to="/register">
                  <Button variant="info">register</Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Login;
