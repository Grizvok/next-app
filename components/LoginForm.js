import axios from "axios";
//import classNames from "classnames";
import Router from "next/router";
import {UserContainer} from "../Containers/UserContainer";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordError: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("/api/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error.response.data);
        return;
      });
  };
  
  render() {
    return (
          <form method="POST" onSubmit={this.handleSubmit}>
            <div className="column is-half container form-container">
              <div className="box">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope" />
                    </span>
                  </p>
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
    );
  }
}

export default LoginForm;
