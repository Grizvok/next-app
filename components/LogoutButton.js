import React from 'react';
import { Subscribe } from 'unstated';
import Link from 'next/link';

import UserContainer from '../Containers/UserContainer';

class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Subscribe to={[UserContainer]}>
        {(usercontainer) => (
          <Link href="javascript:void(0)">
            <a
              onClick={usercontainer.removeCurrentUser}
              className="dropdown-item"
            >
              Logout
            </a>
          </Link>
        )}
      </Subscribe>
    );
  }
}

export default LogoutButton;
