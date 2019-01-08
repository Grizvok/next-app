//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';

//our packages
import UserContainer from '../Containers/UserContainer';

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
  }
  render() {
    return (
      <Subscribe to={[UserContainer]}>
        {(usercontainer) => (
          <Link href="javascript:void(0)">
            <a onClick={this.props.handleLogout} className="navbar-item">
              Logout
            </a>
          </Link>
        )}
      </Subscribe>
    );
  }
}

const LoginButtonControl = () => (
  <Subscribe to={[UserContainer]}>
    {(usercontainer) => {
      if (usercontainer.state.currentUser) {
        return <LogoutButton handleLogout={usercontainer.removeCurrentUser} />;
      }
      return <LoginButton />;
    }}
  </Subscribe>
);

export default LoginButtonControl;
