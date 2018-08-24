import usercontainer from "../Containers/UserContainer";
import { Subscribe } from "unstated";
import Link from "next/link";
import axios from "axios";
import Router from "next/router";

function LoginButton(props) {
  return (
    <Link prefetch href="/login" as="/login">
      <a className="navbar-item">Login</a>
    </Link>
  );
}

class LogoutButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("This function runs");
    axios
      .post("/api/logout", { withCredentials: true }, {})
      .then(response => {
        usercontainer.removeCurrentUser();
        Router.push("/login");
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }

  render() {
    return (
      <Link href="#">
        <a onClick={this.handleClick} className="navbar-item">Logout</a>
      </Link>
    );
  }
}

class LoginButtonControl extends React.Component {
  render() {
    let button;
    if (usercontainer.state.currentUser) {
      button = <LogoutButton />;
    } else {
      button = <LoginButton />;
    }
    return (
      <Subscribe to={[usercontainer]}>{usercontainer => button}</Subscribe>
    );
  }
}

export default LoginButtonControl;
