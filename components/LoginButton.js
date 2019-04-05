//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';

//our packages
import { userStore } from '../Containers/UserContainer';

export default () => (
  <Subscribe to={[userStore]}>
    {(userstore) => {
      if (userstore.state.currentUser) {
        return null;
      } else {
        return <LoginButton />;
      }
    }}
  </Subscribe>
);

function LoginButton(props) {
  return (
    <Link prefetch href="/login" as="/login">
      <a className="button">Login</a>
    </Link>
  );
}

class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Subscribe to={[userStore]}>
        {(userstore) => (
          <Link href="javascript:void(0)">
            <a onClick={this.props.handleLogout} className="button">
              Logout
            </a>
          </Link>
        )}
      </Subscribe>
    );
  }
}

const LoginButtonControl = () => (
  <Subscribe to={[userStore]}>
    {(userstore) => {
      if (userstore.state.currentUser) {
        return null;
      }
      return <LoginButton />;
    }}
  </Subscribe>
);

//export default LoginButtonControl;
