//npm packages
import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';

//our packages
import UserContainer from '../Containers/UserContainer';

export default () => (
  <Subscribe to={[UserContainer]}>
    {(usercontainer) => {
      if (usercontainer.state.currentUser) {
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
      <a className="button is-light">Login</a>
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
            <a onClick={this.props.handleLogout} className="button is-light">
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
        return null;
      }
      return <LoginButton />;
    }}
  </Subscribe>
);

//export default LoginButtonControl;
