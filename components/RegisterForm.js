import axios from "axios";
import classNames from "classnames";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      passwordError: "",
      confirmPasswordError: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  validate = () => {
    let isError = false;
    const errors = {
      passwordError: "",
      confirmPasswordError: ""
    };

    if (this.state.password.length < 5) {
      isError = true;
      errors.passwordError = "Password needs to be atleast 6 characters long";
    }

    if (this.state.password !== this.state.confirmPassword) {
      isError = true;
      errors.confirmPasswordError =
        "Confirm password does not match your password";
    }

    this.setState({ ...errors });

    return isError;
  };

  handleSubmit(e) {
    let err = this.validate();
    e.preventDefault();
    if (!err) {
      this.setState({
        email: "",
        password: "",
        confirmPassword: "",
        passwordError: "",
        confirmPasswordError: ""
      });
      axios.post("/api/register", {
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      });
    }
  }
  render() {
    let passwordInputClass = classNames({
      input: true,
      "register-input": true,
      "is-danger": this.state.passwordError && this.state.password
    });
    let confirmPasswordClass = classNames({
      input: true,
      "register-input": true,
      "is-danger": this.state.confirmPasswordError
    });

    return (
      <form method="POST" onSubmit={this.handleSubmit}>
        <div align="center" className="column is-half container form-container">
          <div className="box">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input register-input"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope" />
                </span>
              </p>
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
              <div>
                <article className=" message help is-danger register-error-text">
                  {this.state.passwordError}
                </article>
              </div>
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
              <p className="help is-danger register-error-text">
                {this.state.confirmPasswordError}
              </p>
            </div>
            <div align="left" className="field">
              <p className="control">
                <button className="button is-success">Register</button>
              </p>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default RegisterForm;
