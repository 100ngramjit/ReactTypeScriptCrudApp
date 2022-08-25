import React, { useState, useContext } from "react";
import "./index.scss";
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
import {
  LABEL_EMAIL,
  LABEL_LOGIN,
  LABEL_REGISTER,
  LABEL_PASSWORD,
  LABEL_CONIRM_PASSWORD,
} from "constants/Constants";
import { emailRegexRule } from "constants/Regex";
import { LoginContext } from "context/LoginState";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { URL_DASHBOARD, URL_ROOT } from "constants/urlConstants";

const Signup = () => {
  const stateProvider = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showHideToggle, setshowHideToggle] = useState(true);
  const [showHideConfirmPasswordToggle, setShowHideConfirmPasswordToggle] =
    useState(true);

  let auth = JSON.parse(localStorage.getItem("auth"));

  const handleSignup = (values) => {
    if (auth === null) {
      auth = [{ username: "", password: "" }];
    }

    if (values.password === values.ConfirmPassword) {
      const same = auth.filter((d) => d.username === values.email);
      if (same.length === 0) {
        auth = [...auth, { username: values.email, password: values.password }];
        localStorage.setItem("auth", JSON.stringify(auth));
        localStorage.setItem("userlogined", values.email);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        stateProvider.setIsUserLoggedIn(true);
      } else {
        toast.error(values.email + " exist!");
      }
    } else {
      toast.error("Passwords are not matching");
    }
  };
  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };
  return (
    <Container>
      {stateProvider.isUserLoggedIn && <Navigate to={URL_DASHBOARD} replace />}
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
              <Form onSubmit={handleSubmit(handleSignup)}>
                <h3>{LABEL_REGISTER}</h3>
                <hr className="line" />
                <Form.Group controlId="username">
                  <Form.Label>{LABEL_EMAIL}</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Email"
                    className="m-2 p-10"
                    {...register("email", {
                      required: true,
                      pattern: emailRegexRule,
                    })}
                  />
                </Form.Group>
                {errors.email && (
                  <p className="text-danger">Please check the Email</p>
                )}
                <Form.Group controlId="password">
                  <Form.Label>{LABEL_PASSWORD}</Form.Label>
                  <InputGroup className="m-2">
                    <Form.Control
                      type={showHideToggle ? "password" : "text"}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Add password"
                      {...register("password", {
                        required: true,
                        maxLength: 10,
                      })}
                    />
                    <InputGroup.Text
                      onClick={() => {
                        setshowHideToggle(!showHideToggle);
                      }}
                    >
                      {showHideToggle ? (
                        <BsFillEyeFill />
                      ) : (
                        <BsFillEyeSlashFill />
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                {errors.password && (
                  <p className="text-danger">Please check the Password</p>
                )}
                <Form.Group controlId="ConfirmPassword">
                  <Form.Label>{LABEL_CONIRM_PASSWORD}</Form.Label>
                  <InputGroup className="m-2">
                    <Form.Control
                      type={showHideConfirmPasswordToggle ? "password" : "text"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      {...register("ConfirmPassword", {
                        required: true,
                        maxLength: 10,
                      })}
                    />
                    <InputGroup.Text
                      onClick={() => {
                        setShowHideConfirmPasswordToggle(
                          !showHideConfirmPasswordToggle
                        );
                      }}
                    >
                      {showHideConfirmPasswordToggle ? (
                        <BsFillEyeFill />
                      ) : (
                        <BsFillEyeSlashFill />
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
                {errors.ConfirmPassword && (
                  <p className="text-danger">Please check the Password</p>
                )}
                <Button type="submit" className="m-2">
                  {LABEL_REGISTER}
                </Button>
                <Link to={URL_ROOT}>
                  <Button type="button" variant="info">
                    {LABEL_LOGIN}
                  </Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
