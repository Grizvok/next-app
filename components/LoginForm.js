import React from 'react';
import usercontainer from "../Containers/UserContainer";
import { Subscribe } from "unstated";
import classNames from "classnames";

class LoginForm extends React.Component {
  state = {
    user: "",
    password: "",
    error: ""
  };

  handleChange = e => {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const error = await usercontainer.handleUserUpdate(e);
    this.setState({
      user: "",
      password: "",
      error: error
    });
  };

  render() {
    console.log(usercontainer.state.currentUser);
    let loginErrorClass = classNames({
      help: true,
      "is-danger": true,
      "is-invisible": !usercontainer.state.error
    });
    return (
      <Subscribe to={[usercontainer]}>
        {usercontainer => (
          <form method="POST" onSubmit={this.handleSubmit}>
            <div
              align="center"
              className="column is-half container form-container"
            >
              <div className="box">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      name="user"
                      type="text"
                      placeholder="Username"
                      value={this.state.user}
                      onChange={this.handleChange}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope" />
                    </span>
                  </p>
                  <span className={loginErrorClass}>
                    Incorrect username or password.
                  </span>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock" />
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control">
                    <button className="button is-success">Login</button>
                  </p>
                </div>
              </div>
            </div>
          </form>
        )}
      </Subscribe>
    );
  }
}
export default LoginForm;
