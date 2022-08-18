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
import { Register, LogIn, Email, Password } from "components/Constants";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { LoginContext } from "context/LoginState";
import { toast } from "react-hot-toast";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login(props) {
  const stateProvider = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passType, setPassType] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const auth = JSON.parse(localStorage.getItem("auth"));

  const handleLogin = () => {
    const values = getValues();
    if (auth === null) {
      toast.error("no user found!");
    }

    const same = auth.filter((d) => d.username === values.email);

    if (same.length !== 0) {
      if (same[0].password === values.password) {
        localStorage.setItem("userlogined", values.email);
        setUsername("");
        setPassword("");
        stateProvider.setIsUserLoggedIn(true);
      } else {
        toast.error("wrong password.");
      }
    } else {
      toast.error(values.email + "user not exist!");
    }
  };
  // useEffect(() => {
  //   stateProvider.setIsUserLoggedIn(false);
  // }, []);

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
              <Form onSubmit={handleSubmit(handleLogin)}>
                <h3>{LogIn}</h3>
                <hr />
                <Form.Group controlId="username">
                  <Form.Label>{Email}</Form.Label>
                  <Form.Control
                    type="text"
                    // value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Email"
                    className="m-1"
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
                  <Form.Label>{Password}</Form.Label>
                  <InputGroup className="m-2">
                    <Form.Control
                      type={passType ? "password" : "text"}
                      // value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Add password"
                      {...register("password", {
                        required: true,
                      })}
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
                {errors.password && (
                  <p className="text-danger">Please check the Password</p>
                )}
                {"  "}
                <Button type="submit" disabled={username}>
                  {LogIn}
                </Button>
                {"  "}
                <Link to="/register">
                  <Button variant="info">{Register}</Button>
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
