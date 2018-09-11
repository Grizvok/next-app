//npm packages
import React from 'react';
import classNames from 'classnames';
import { Subscribe } from 'unstated';
import Router from 'next/router';

//our packages
import UserContainer from '../Containers/UserContainer';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userError: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      confirmPasswordError: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  validate = () => {
    let isError = false;
    const errors = {
      passwordError: '',
      confirmPasswordError: '',
    };

    if (this.state.password.length < 5) {
      isError = true;
      errors.passwordError = 'Password needs to be atleast 6 characters long';
    }

    if (this.state.password !== this.state.confirmPassword) {
      isError = true;
      errors.confirmPasswordError =
        'Confirm password does not match your password';
    }

    this.setState({ ...errors });

    return isError;
  };

  handleSubmit = async (e) => {
    const user = this.state.user.toUpperCase();
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    let err = this.validate();
    e.preventDefault();
    if (!err) {
      this.setState({
        user: '',
        password: '',
        confirmPassword: '',
        passwordError: '',
        confirmPasswordError: '',
        userError: '',
      });
      const error = await usercontainer.handleUserRegister(e);
    }
  };

  render() {
    if (usercontainer.state.currentUser) {
      Router.push(`/user/${usercontainer.state.currentUser}`);
    }
    let userSpanClass = classNames({
      help: true,
      'is-danger': true,
      'is-invisible': !this.state.userError,
    });
    let passwordInputClass = classNames({
      input: true,
      'register-input': true,
      'is-danger': this.state.passwordError && this.state.password.length < 6,
      'is-success': this.state.password.length > 5,
    });
    let confirmPasswordClass = classNames({
      input: true,
      'register-input': true,
      'is-danger':
        this.state.confirmPasswordError &&
        !(
          this.state.password.length > 5 &&
          this.state.password === this.state.confirmPassword
        ),
      'is-success':
        this.state.confirmPassword.length > 5 &&
        this.state.password === this.state.confirmPassword,
    });
    let passwordSpanClass = classNames({
      help: true,
      'is-danger': true,
      'is-invisible': !(
        this.state.passwordError && this.state.password.length < 6
      ),
    });
    let confirmPasswordSpanClass = classNames({
      help: true,
      'is-danger': true,
      'is-invisible':
        !this.state.confirmPasswordError ||
        (this.state.password.length > 5 &&
          this.state.password === this.state.confirmPassword),
    });

    return (
      <Subscribe to={[UserContainer]}>
        {(usercontainer) => (
          <form method="POST" onSubmit={this.handleSubmit}>
            <div
              align="center"
              className="column is-half container form-container"
            >
              <div className="box">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input register-input"
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
                  <span className={userSpanClass}>
                    That Username is already taken
                  </span>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className={passwordInputClass}
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock" />
                    </span>
                  </p>
                  <span className={passwordSpanClass}>
                    Password needs to be atleast 6 characters long
                  </span>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className={confirmPasswordClass}
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock" />
                    </span>
                  </p>
                  <span className={confirmPasswordSpanClass}>
                    Confirm password does not match your password
                  </span>
                </div>
                <div align="left" className="field">
                  <p className="control">
                    <button className="button is-success">Register</button>
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

export default RegisterForm;
