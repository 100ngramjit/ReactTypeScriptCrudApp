import React, { useState, useContext } from "react";
import {
  Form,
  Button,
  Container,
  InputGroup,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { toast } from "react-hot-toast";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { LoginContext } from "context/LoginState";
import { Navigate, Link } from "react-router-dom";

function Signup(props) {
  const stateProvider = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [showHideToggle1, setShowHideToggle1] = useState(true);
  const [showHideToggle2, setShowHideToggle2] = useState(true);

  let auth = JSON.parse(localStorage.getItem("auth"));

  const handleSignup = () => {
    // if (auth === null) {
    //   auth = [{ username: "aaa", password: "aaa" }];
    // }

    if (password1 === password2) {
      const same = auth.filter((d) => d.username === username);

      if (same.length === 0) {
        auth = [...auth, { username: username, password: password1 }];
        localStorage.setItem("auth", JSON.stringify(auth));
        localStorage.setItem("userlogined", username);
        setUsername("");
        setPassword1("");
        setPassword2("");
        stateProvider.isUserLoggedIn = true;
      } else {
        toast.error(username + " exist!");
      }
    } else {
      toast.error("Passwords are not matching");
    }
  };
  const validateForm = () => {
    return username.length > 0 && password1.length > 0;
  };
  return (
    <Container>
      {stateProvider.isUserLoggedIn ? <Navigate to="/dashboard" replace /> : ""}
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
                  handleSignup();
                }}
              >
                <h3>Signup</h3>
                <hr />
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="m-2 p-10"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password1">
                  <Form.Label>username</Form.Label>
                  <InputGroup className="m-2">
                    <Form.Control
                      type={showHideToggle1 ? "password" : "text"}
                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                      placeholder="Add password"
                      required
                    />
                    <InputGroup.Text
                      onClick={() => {
                        setShowHideToggle1(!showHideToggle1);
                      }}
                    >
                      {showHideToggle1 ? (
                        <BsFillEyeFill />
                      ) : (
                        <BsFillEyeSlashFill />
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="password2">
                  <Form.Label>confirm username</Form.Label>
                  <InputGroup className="m-2">
                    <Form.Control
                      type={showHideToggle2 ? "password" : "text"}
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      placeholder="Confirm password"
                      required
                    />
                    <InputGroup.Text
                      onClick={() => {
                        setShowHideToggle2(!showHideToggle2);
                      }}
                    >
                      {showHideToggle2 ? (
                        <BsFillEyeFill />
                      ) : (
                        <BsFillEyeSlashFill />
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                <Button type="submit" disabled={!validateForm()}>
                  signup
                </Button>{" "}
                <Link to="/">
                  <Button type="button" variant="info">
                    Login
                  </Button>
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

export default Signup;
