import UserContainer from "../Containers/UserContainer";
import { Subscribe } from "unstated";

class LoginForm extends React.Component {
  state = {
    email: "",
    password: "",
    passwordError: ""
  };

  handleChange = e => {
    const target = e.target;
    const value = e.target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Subscribe to={[UserContainer]}>
        {usercontainer => (
          <form method="POST" onSubmit={usercontainer.handleUserUpdate}>
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
        )}
      </Subscribe>
    );
  }
}
export default LoginForm;
