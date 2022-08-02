import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { get } from "lodash";

const Header = ({ name, location }) => {
  // const [username,setUsername]=useState(name)
  // const[board,setBoard]=useState([])
  // const[boardItem,setBoardItem]=useState("")
  const [toggle, setToggle] = useState(false);
  const [submit, setSubmit] = useState(true);
  const [logout, setLogout] = useState(false);
  const [loggedInUserObj, setLoggedInUserObj] = useState({});

  const onLogoutYes = () => {
    setSubmit(false);
    setToggle(true);

    const userObj = JSON.parse(
      localStorage.getItem(get(loggedInUserObj, "userName", ""))
    );
    userObj.isUserLoggedIn = false;
    localStorage.setItem(
      get(loggedInUserObj, "userName", ""),
      JSON.stringify(userObj)
    );
  };

  const onLogout = () => {
    setLogout(!logout);
  };

  useEffect(() => {
    const loggedInUserName = get(location, "state.userName", {});
    setLoggedInUserObj(JSON.parse(localStorage.getItem(loggedInUserName)));
  }, []);

  const localUname = `${get(loggedInUserObj, "firstName", "")} ${get(
    loggedInUserObj,
    "lastName",
    ""
  )}`;

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-info justify-content-between">
        <div className="container">
          <div className="p-2 bg-gradient-dark text-white">Dashboard</div>
          <button type="button" className="btn btn-danger" onClick={onLogout}>
            LOGOUT
          </button>
        </div>
      </nav>

      {!submit ? <Navigate to="/" replace /> : null}
      {logout ? (
        <SweetAlert
          showCancel
          cancelBtnBsStyle="error"
          confirmBtnText="Yes"
          confirmBtnBsStyle="success"
          title="Are you sure?"
          onConfirm={onLogoutYes}
          onCancel={onLogout}
          focusCancelBtn
        ></SweetAlert>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
