//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import classNames from 'classnames';

//our packages
import { userStore } from '../Containers/UserContainer';

class LoginForm extends React.Component {
  state = {
    user: '',
    password: '',
    error: '',
  };

  handleChange = (e) => {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    let loginErrorClass = classNames({
      help: true,
      'is-danger': true,
      'is-invisible': true,
    });
    //now conditionally render if there is an error after handling login
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => (
          <form method="POST" onSubmit={userstore.handleUserUpdate}>
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
                      autoComplete="off"
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
