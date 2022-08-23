import React, { useState, useContext, useEffect } from "react";
import "./index.scss";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  InputGroup,
} from "react-bootstrap";
import {
  LABEL_EMAIL,
  LABEL_LOGIN,
  LABEL_PASSWORD,
  LABEL_REGISTER,
} from "constants/Constants";
import { emailRegexRule } from "constants/Regex";
import { URL_DASHBOARD, URL_REGISTER } from "constants/urlConstants";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { LoginContext } from "context/LoginState";
import { toast } from "react-hot-toast";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
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

  let auth = JSON.parse(localStorage.getItem("auth"));

  const handleLogin = () => {
    const values = getValues();
    if (auth === null) {
      auth = [{ username: "", password: "" }];
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

  return (
    <Container>
      {stateProvider.isUserLoggedIn ? (
        <Navigate to={URL_DASHBOARD} replace />
      ) : (
        ""
      )}
      <Row className="justify-content-md-center">
        <Col xs={4}>
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
                <h3>{LABEL_LOGIN}</h3>
                <hr className="line" />
                <Form.Group controlId="username">
                  <Form.Label>{LABEL_EMAIL}</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Email"
                    className="m-1"
                    {...register("email", {
                      required: true,
                      pattern: emailRegexRule,
                    })}
                  />
                </Form.Group>
                {errors.email && (
                  <p className="text-danger">Please check the Email</p>
                )}
                <Form.Group controlId="password1">
                  <Form.Label>{LABEL_PASSWORD}</Form.Label>
                  <InputGroup className="m-2">
                    <Form.Control
                      type={passType ? "password" : "text"}
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
                <Button type="submit" disabled={username} className="m-2">
                  {LABEL_LOGIN}
                </Button>
                <Link to={URL_REGISTER}>
                  <Button variant="info">{LABEL_REGISTER}</Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
