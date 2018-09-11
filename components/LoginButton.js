//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';

//our packages
import usercontainer from '../Containers/UserContainer';

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

  //refactor to fetch
  handleClick() {
    axios
      .post('/api/logout', { withCredentials: true }, {})
      .then((response) => {
        usercontainer.removeCurrentUser();
        Router.push('/login');
      })
      .catch((error) => {});
  }

  render() {
    return (
      <Link href="#">
        <a onClick={this.handleClick} className="navbar-item">
          Logout
        </a>
      </Link>
    );
  }
}

class LoginButtonControl extends React.Component {
  render() {
    console.log(usercontainer.state.currentUser);
    let button;
    if (usercontainer.state.currentUser) {
      button = <LogoutButton />;
    } else {
      button = <LoginButton />;
    }
    return (
      <Subscribe to={[usercontainer]}>{(usercontainer) => button}</Subscribe>
    );
  }
}

export default LoginButtonControl;
