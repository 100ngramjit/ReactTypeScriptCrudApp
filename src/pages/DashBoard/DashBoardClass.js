import React from "react";
import { Redirect } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { get } from "lodash";

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.name,
      board: [],
      boardItem: "",
      toggle: false,
      submit: true,
      logout: false,
      loggedInUserObj: {},
    };
  }

  onLogoutYes = () => {
    this.setState({ submit: false });
    this.setState({ toggle: true });
    const userObj = JSON.parse(
      localStorage.getItem(get(this.state.loggedInUserObj, "userName", ""))
    );
    userObj.isUserLoggedIn = false;
    localStorage.setItem(
      get(this.state.loggedInUserObj, "userName", ""),
      JSON.stringify(userObj)
    );
  };

  onLogout = () => {
    this.setState({
      logout: !this.state.logout,
    });
  };

  componentDidMount() {
    const loggedInUserName = get(this.props.location, "state.userName", {});
    this.setState({
      loggedInUserObj: JSON.parse(localStorage.getItem(loggedInUserName)),
    });
  }

  render() {
    const localUname = `${get(
      this.state.loggedInUserObj,
      "firstName",
      ""
    )} ${get(this.state.loggedInUserObj, "lastName", "")}`;

    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-info justify-content-between">
          <div className="container">
            <div className="p-2 bg-gradient-dark text-white">Dashboard</div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onLogout}
            >
              LOGOUT
            </button>
          </div>
        </nav>

        <div className="container">
          <h1 className="mt-4">Hello,{localUname}</h1>
          <p>Welcome to the dashboard</p>
        </div>
        {!this.state.submit ? <Redirect to={`/`} /> : null}
        {this.state.logout ? (
          <SweetAlert
            showCancel
            cancelBtnBsStyle="error"
            confirmBtnText="Yes"
            confirmBtnBsStyle="success"
            title="Are you sure?"
            onConfirm={this.onLogoutYes}
            onCancel={this.onLogout}
            focusCancelBtn
          ></SweetAlert>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default DashBoard;
