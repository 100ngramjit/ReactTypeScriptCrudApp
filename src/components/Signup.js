import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-hot-toast";

function Signup(props) {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [passType1, setPassType1] = useState(true);
  const [passType2, setPassType2] = useState(true);

  var auth = JSON.parse(localStorage.getItem("auth"));

  const handleSignup = () => {
    if (auth === null) {
      auth = [{ username: "aaa", password: "aaa" }];
    }

    if (password1 === password2) {
      const same = auth.filter((d) => d.username === username);

      if (same.length === 0) {
        auth = [...auth, { username: username, password: password1 }];
        localStorage.setItem("auth", JSON.stringify(auth));
        localStorage.setItem("userlogined", username);
        setUsername("");
        setPassword1("");
        setPassword2("");
        props.afterSignup(username);
      } else {
        toast.error(username + " exist!");
      }
    } else {
      toast.error("Passwords are not matching");
    }
  };

  return (
    <Container>
      <h2>Hello,Please enter your credentials</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="m-2 p-10"
      />

      <input
        type={passType1 ? "password" : "text"}
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
        placeholder="set password"
        className="m-2 p-10"
      />

      <button
        className="m-2 p-10 btn btn-secondary"
        onClick={() => {
          setPassType1(!passType1);
        }}
      >
        {passType1 ? "show" : "hide"}
      </button>

      <input
        type={passType2 ? "password" : "text"}
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        placeholder="confirm password"
        className="m-2 p-10"
      />

      <button
        className="m-2 p-10 btn btn-secondary"
        onClick={() => {
          setPassType2(!passType2);
        }}
      >
        {passType2 ? "show" : "hide"}
      </button>

      <button className="m-2 p-10 btn btn-primary" onClick={handleSignup}>
        signup
      </button>
    </Container>
  );
}

export default Signup;
