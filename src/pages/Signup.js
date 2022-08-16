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
import { useForm } from "react-hook-form";

function Signup(props) {
  const stateProvider = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [showHideToggle1, setShowHideToggle1] = useState(true);
  const [showHideToggle2, setShowHideToggle2] = useState(true);

  let auth = JSON.parse(localStorage.getItem("auth"));

  const handleSignup = () => {
    // if (auth === null) {
    //   auth = [{ username: "aaa", password: "aaa" }];
    // }
    const values = getValues();
    if (values.password1 === values.password2) {
      const same = auth.filter((d) => d.username === values.email);
      console.log(same);
      if (same.length === 0) {
        auth = [
          ...auth,
          { username: values.email, password: values.password1 },
        ];
        localStorage.setItem("auth", JSON.stringify(auth));
        localStorage.setItem("userlogined", values.email);
        setUsername("");
        setPassword1("");
        setPassword2("");
        stateProvider.isUserLoggedIn = true;
      } else {
        toast.error(values.email + " exist!");
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
              <Form onSubmit={handleSubmit(handleSignup)}>
                <h3>Signup</h3>
                <hr />
                <Form.Group controlId="username">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    // value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="m-2 p-10"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                </Form.Group>
                {errors.email && (
                  <p className="text-danger">Please check the Email</p>
                )}
                <Form.Group controlId="password1">
                  <Form.Label>set password</Form.Label>
                  <InputGroup className="m-2">
                    <Form.Control
                      type={showHideToggle1 ? "password" : "text"}
                      // value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                      placeholder="Add password"
                      {...register("password1", {
                        required: true,
                        maxLength: 10,
                      })}
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
                {errors.password1 && (
                  <p className="text-danger">Please check the Password</p>
                )}
                <Form.Group controlId="password2">
                  <Form.Label>confirm password</Form.Label>
                  <InputGroup className="m-2">
                    <Form.Control
                      type={showHideToggle2 ? "password" : "text"}
                      // value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      placeholder="Confirm password"
                      {...register("password2", {
                        required: true,
                        maxLength: 10,
                      })}
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
                {errors.password1 && (
                  <p className="text-danger">Please check the Password</p>
                )}
                <Button type="submit">Signup</Button>{" "}
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
