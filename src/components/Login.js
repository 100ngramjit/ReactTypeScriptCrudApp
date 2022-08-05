import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-hot-toast";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passType, setPassType] = useState(true);

  var auth = JSON.parse(localStorage.getItem("auth"));

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
        props.afterLogin(username);
      } else {
        toast.error("wrong password.");
      }
    } else {
      toast.error(username + "user not exist!");
    }
  };

  return (
    <Container>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
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
        <button
          className="m-2 p-10 btn btn-secondary"
          onClick={() => {
            setPassType(!passType);
          }}
        >
          {passType ? "show" : "hide"}
        </button>

        <button onClick={handleLogin} className="m-2 p-10 btn btn-primary">
          login
        </button>
      </Form>
    </Container>
  );
}

export default Login;
