//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import classNames from 'classnames';
import Link from 'next/link';

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

    return (
      <Subscribe to={[userStore]}>
        {(userstore) => (
          <form method="POST" onSubmit={userstore.handleUserUpdate}>
            <div align="center" className="form-container">
              <div className="box">
                <div className="field username-input">
                  <p className="control has-icons-left">
                    <input
                      className="input is-medium"
                      name="user"
                      type="text"
                      placeholder="Username"
                      value={this.state.user}
                      onChange={this.handleChange}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user" />
                    </span>
                  </p>
                  <span className={loginErrorClass}>
                    Incorrect username or password.
                  </span>
                </div>
                <div className="field password-input">
                  <p className="control has-icons-left">
                    <input
                      className="input is-medium"
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
                    <button className="button is-success is-fullwidth">
                      Login
                    </button>
                  </p>
                </div>
                <span className="not-registered-text">
                  Not registered? Create an{' '}
                  <Link href="/register" as="/register">
                    account
                  </Link>
                </span>
              </div>
            </div>
          </form>
        )}
      </Subscribe>
    );
  }
}
export default LoginForm;
