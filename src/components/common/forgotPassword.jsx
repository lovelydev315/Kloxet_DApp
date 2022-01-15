import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderLogin from "../common/header-login";

class ForgotPassword extends Component {
  state = {
    account: { username: "" }
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    return (
      <React.Fragment>
        <HeaderLogin />
        <div className="loginFormArea">
          <h1>Forgot Password</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fa fa-user" />
                </div>
              </div>
              <input
                type="email"
                className="form-control"
                id="username"
                name="username"
                value={this.state.account.username}
                onChange={this.handleChange}
                placeholder="Enter email"
              />
            </div>

            <button
              onClick={this.handleLogin}
              type="button"
              className="btn btn-primary loginButton"
            >
              Submit
            </button>

            <p className="dontHaveAccount">
              Go back to <Link to="/login">Login</Link> page
            </p>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ForgotPassword;
