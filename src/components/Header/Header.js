import React, { useContext } from "react";
import { LoginContext } from "context/LoginState";

const Header = () => {
  const a = useContext(LoginContext);
  const afterLogout = () => {
    localStorage.removeItem("userlogined");
    a.setSignupScreen(false);
    a.setLoginScreen(true);
    a.setIsUserLoggedIn(false);
  };
  return (
    <div>
      {a.isUserLoggedIn ? (
        <div>
          <nav className="navbar navbar-expand-lg bg-info justify-content-between">
            <div className="container">
              <div className="p-2 bg-gradient-dark text-white">
                {a.displayName} logged in
              </div>
              <button onClick={afterLogout} className="btn btn-danger">
                logout
              </button>
            </div>
          </nav>
        </div>
      ) : (
        ""
      )}
      {/* {a.loginScreen ? (
        <>
          <Redirect to="/" replace />
        </>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default Header;

// import React, { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import SweetAlert from "react-bootstrap-sweetalert";
// import { get } from "lodash";

// const Header = ({ name, location }) => {
//   // const [username,setUsername]=useState(name)
//   // const[board,setBoard]=useState([])
//   // const[boardItem,setBoardItem]=useState("")
//   const [toggle, setToggle] = useState(false);
//   const [submit, setSubmit] = useState(true);
//   const [logout, setLogout] = useState(false);
//   const [loggedInUserObj, setLoggedInUserObj] = useState({});

//   const onLogoutConfirmation = () => {
//     setSubmit(false);
//     setToggle(true);
//     console.log("iadqwdihbdqw");

//     const userObj = JSON.parse(
//       localStorage.getItem(get(loggedInUserObj, "userName", ""))
//     );
//     console.log("first", userObj);
//     userObj.isUserLoggedIn = false;
//     localStorage.setItem(
//       get(loggedInUserObj, "userName", ""),
//       JSON.stringify(userObj)
//     );
//   };

//   const onLogout = () => {
//     setLogout(!logout);
//   };

//   useEffect(() => {
//     const loggedInUserName = get(location, "state.userName", {});
//     setLoggedInUserObj(JSON.parse(localStorage.getItem(loggedInUserName)));
//   }, []);

//   const localUname = `${get(loggedInUserObj, "firstName", "")} ${get(
//     loggedInUserObj,
//     "lastName",
//     ""
//   )}`;

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg bg-info justify-content-between">
//         <div className="container">
//           <div className="p-2 bg-gradient-dark text-white">
//             {localUname} Dashboard
//           </div>
//           <button type="button" className="btn btn-danger" onClick={onLogout}>
//             LOGOUT
//           </button>
//         </div>
//       </nav>

//       {!submit ? <Navigate to="/" replace /> : null}
//       {logout ? (
//         <SweetAlert
//           showCancel
//           cancelBtnBsStyle="error"
//           confirmBtnText="Yes"
//           confirmBtnBsStyle="success"
//           title="Are you sure?"
//           onConfirm={onLogoutConfirmation}
//           onCancel={onLogout}
//           focusCancelBtn
//         />
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// export default Header;
